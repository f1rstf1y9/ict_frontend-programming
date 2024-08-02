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
    onChangeName,
    onChangeTitle,
    onChangeSubTitle,
    onChangeBgColor,
    onChangeTitleColor,
    onChangeSubTitleColor,
    onChangeTitleShadows,
  } = useContext(ThumbnailDispatchContext);

  const onDownloadBtnClick = () => {
    domtoimage.toJpeg(document.querySelector(".preview")).then((img) => {
      saveAs(img, `${thumbnail.name}.jpg`);
    });
  };

  const onSaveBtnClick = () => {
    const currentThumbnails = localStorage.getItem("thumbnails");
    if (thumbnail.id === 0) {
      const newThumbnailList = [];
      const newId = currentThumbnails
        ? currentThumbnails[currentThumbnails.length - 1].id + 1
        : 1;
      newThumbnailList.push({
        id: newId,
        name: thumbnail.name,
        title: thumbnail.title,
        subTitle: thumbnail.subTitle,
        bgColor: thumbnail.bgColor,
        titleColor: thumbnail.titleColor,
        subTitleColor: thumbnail.subTitleColor,
        isTitleShadows: thumbnail.isTitleShadows,
      });
      localStorage.setItem(
        "thumbnails",
        JSON.stringify(newThumbnailList.sort((a, b) => b.id - a.id))
      );
      setThumbnailList(newThumbnailList);
    }

    // newThumbnailList[thumbnailList.findIndex((t) => t.id === thumbnail.id)] = {
    //   ...thumbnail,
    //   bgColor: onChangeBgColor(),
    //   titleColor: onChangeTitleColor(),
    //   subTitleColor: onChangeSubTitleColor(),
    //   titleShadows: onChangeTitleShadows(),
    // };
  };

  return (
    <div className="controller">
      <div className="content_controller">
        <div className="controller_input">
          <label htmlFor="thumbnail_name">썸네일 이름</label>
          <input
            id="thumbnail_name"
            type="text"
            value={thumbnail.name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>
        <div className="controller_input">
          <label htmlFor="thumbnail_title">제목</label>
          <input
            id="thumbnail_title"
            type="text"
            value={thumbnail.title}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
        </div>
        <div className="controller_input">
          <label htmlFor="thumbnail_sub-title">소제목</label>
          <input
            id="thumbnail_sub-title"
            type="text"
            value={thumbnail.subTitle}
            onChange={(e) => onChangeSubTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="theme_controller">
        <div className="color_input__wrapper">
          <div className="color_input">
            <label>배경 색상</label>
            <PopoverPicker
              color={thumbnail.bgColor}
              onChange={onChangeBgColor}
            />
          </div>
          <div className="color_input">
            <label>제목 색상</label>
            <PopoverPicker
              color={thumbnail.titleColor}
              onChange={onChangeTitleColor}
            />
          </div>
          <div className="color_input">
            <label>소제목 색상</label>
            <PopoverPicker
              color={thumbnail.subTitleColor}
              onChange={onChangeSubTitleColor}
            />
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
        <div className="button__wrapper">
          <button onClick={onDownloadBtnClick}>다운로드</button>
          <button onClick={onSaveBtnClick}>저장</button>
        </div>
      </div>
    </div>
  );
}
