import React, { useState, useContext } from "react";
import "../styles/ThumbnailController.css";
import { ThumbnailStateContext } from "../App";
import { ThumbnailDispatchContext } from "../App";

import { PopoverPicker } from "./PopoverColorPicker";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default function ThumbnailController({
  thumbnailList,
  setThumbnailList,
}) {
  const { thumbnail } = useContext(ThumbnailStateContext);
  const {
    onChangeThumbnail,
    onChangeName,
    onChangeTitle,
    onChangeSubTitle,
    onChangeBgColor,
    onChangeTitleColor,
    onChangeSubTitleColor,
    onChangeTitleShadows,
    onChangeFont,
  } = useContext(ThumbnailDispatchContext);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const onGradientBtnClick = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);
    const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    onChangeBgColor(gradient);
  };

  const onDownloadBtnClick = () => {
    domtoimage.toJpeg(document.querySelector(".preview")).then((img) => {
      saveAs(img, `${thumbnail.name}.jpg`);
    });
  };

  const resetThumbnail = () => {
    onChangeThumbnail({
      thumbnail_id: -1,
      name: "",
      title: "제목을 입력해주세요",
      subTitle: "부제를 입력해주세요",
      bgColor: "#fff",
      titleColor: "#000",
      subTitleColor: "#000",
      isTitleShadows: false,
      font: "Pretendard-Regular",
    });
  };

  const onSaveBtnClick = async () => {
    if (thumbnail.name === "") {
      alert("썸네일 이름을 입력해주세요");
      return;
    }
    const currentThumbnails = localStorage.getItem("thumbnails")
      ? JSON.parse(localStorage.getItem("thumbnails"))
      : [];
    try {
      domtoimage.toJpeg(document.querySelector(".preview")).then((img) => {
        const newId =
          currentThumbnails.length > 0
            ? currentThumbnails[0].thumbnail_id + 1
            : 0;
        currentThumbnails.push({
          thumbnail_id: newId,
          name: thumbnail.name,
          title: thumbnail.title,
          subTitle: thumbnail.subTitle,
          bgColor: thumbnail.bgColor,
          titleColor: thumbnail.titleColor,
          subTitleColor: thumbnail.subTitleColor,
          isTitleShadows: thumbnail.isTitleShadows,
          createDateTime: new Date().getTime(),
          img,
        });
        localStorage.setItem(
          "thumbnails",
          JSON.stringify(
            currentThumbnails.sort((a, b) => b.thumbnail_id - a.thumbnail_id)
          )
        );
        setThumbnailList(
          currentThumbnails.sort((a, b) => b.thumbnail_id - a.thumbnail_id)
        );
        resetThumbnail();
      });
    } catch {
      console.error("Failed to capture the thumbnail image.");
    }
  };

  const onEditBtnClick = async () => {
    try {
      const currentThumbnails = JSON.parse(localStorage.getItem("thumbnails"));
      domtoimage.toJpeg(document.querySelector(".preview")).then((img) => {
        console.log(img);
        currentThumbnails[
          thumbnailList.findIndex(
            (t) => t.thumbnail_id === thumbnail.thumbnail_id
          )
        ] = {
          ...thumbnail,
          name: thumbnail.name,
          title: thumbnail.title,
          subTitle: thumbnail.subTitle,
          bgColor: thumbnail.bgColor,
          titleColor: thumbnail.titleColor,
          subTitleColor: thumbnail.subTitleColor,
          isTitleShadows: thumbnail.isTitleShadows,
          img,
        };
        localStorage.setItem(
          "thumbnails",
          JSON.stringify(
            currentThumbnails.sort((a, b) => b.thumbnail_id - a.thumbnail_id)
          )
        );
        setThumbnailList(
          currentThumbnails.sort((a, b) => b.thumbnail_id - a.thumbnail_id)
        );
        resetThumbnail();
      });
    } catch {
      console.error("Failed to capture the thumbnail image.");
    }
  };

  return (
    <div className="controller">
      <div className="content_controller">
        <div className="controller_input">
          <label htmlFor="thumbnail_name">썸네일 이름</label>
          <input
            id="thumbnail_name"
            type="text"
            placeholder="썸네일 이름을 입력해주세요"
            value={thumbnail.name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>
        <div className="controller_input">
          <label htmlFor="thumbnail_title">제목</label>
          <input
            id="thumbnail_title"
            type="text"
            placeholder="제목을 입력해주세요"
            value={thumbnail.title}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
        </div>
        <div className="controller_input">
          <label htmlFor="thumbnail_sub-title">소제목</label>
          <input
            id="thumbnail_sub-title"
            type="text"
            placeholder="부제를 입력해주세요"
            value={thumbnail.subTitle}
            onChange={(e) => onChangeSubTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="theme_controller">
        <div className="color_input__wrapper">
          <div className="color_input">
            <label>제목 색상</label>
            <PopoverPicker
              color={thumbnail.titleColor}
              onChange={onChangeTitleColor}
              position="right"
            />
          </div>
          <div className="color_input">
            <label>소제목 색상</label>
            <PopoverPicker
              color={thumbnail.subTitleColor}
              onChange={onChangeSubTitleColor}
              position="left"
            />
          </div>
          <div className="color_input">
            <label>배경 색상</label>
            <PopoverPicker
              position="right"
              color={thumbnail.bgColor}
              onChange={onChangeBgColor}
            />
            <button className="gradient_button" onClick={onGradientBtnClick}>
              랜덤 그라데이션
            </button>
          </div>
        </div>
        <div className="title_shadow__wrapper">
          <label htmlFor="">제목 그림자 효과</label>
          <input
            type="checkbox"
            checked={thumbnail.isTitleShadows}
            onChange={(e) => {
              onChangeTitleShadows(e.target.checked);
            }}
          />
        </div>
        <div className="font__wrapper">
          <p>썸네일 폰트</p>
          <div>
            <button
              className="font_pretendard"
              onClick={() => onChangeFont("Pretendard-Regular")}
              style={{
                border:
                  thumbnail.font === "Pretendard-Regular"
                    ? "2px solid #9553ff"
                    : "1px solid #000",
              }}
            >
              프리텐다드
            </button>
            <button
              className="font_saemaul"
              onClick={() => onChangeFont("HSSaemaul-Regular")}
              style={{
                border:
                  thumbnail.font === "HSSaemaul-Regular"
                    ? "2px solid #9553ff"
                    : "1px solid #000",
              }}
            >
              HS새마을체
            </button>
            <button
              className="font_hsgool"
              onClick={() => onChangeFont("HSGooltokki")}
              style={{
                border:
                  thumbnail.font === "HSGooltokki"
                    ? "2px solid #9553ff"
                    : "1px solid #000",
              }}
            >
              HS굴토끼체
            </button>
            <button
              className="font_hssan"
              onClick={() => onChangeFont("HSSanTokki20-Regular")}
              style={{
                border:
                  thumbnail.font === "HSSanTokki20-Regular"
                    ? "2px solid #9553ff"
                    : "1px solid #000",
              }}
            >
              HS산토끼체
            </button>
          </div>
        </div>
        <div className="button__wrapper">
          <button onClick={resetThumbnail}>초기화</button>
          <button onClick={onDownloadBtnClick}>다운로드</button>
          {thumbnail.thumbnail_id === -1 ? (
            <button onClick={onSaveBtnClick}>저장</button>
          ) : (
            <button onClick={onEditBtnClick}>수정</button>
          )}
        </div>
      </div>
    </div>
  );
}
