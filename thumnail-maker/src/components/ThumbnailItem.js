import React, { useContext } from "react";
import { ThumbnailStateContext } from "../App";
import { ThumbnailDispatchContext } from "../App";
import "../styles/ThumbnailItem.css";

import { TbEdit } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";

export default function ThumbnailItem({
  item,
  thumbnailList,
  setThumbnailList,
}) {
  const { thumbnail } = useContext(ThumbnailStateContext);
  const { onChangeThumbnail } = useContext(ThumbnailDispatchContext);
  const handleEditThumbnail = () => {
    onChangeThumbnail(item);
  };
  const handleDeleteThumbnail = () => {
    if (item.thumbnail_id === thumbnail.thumbnail_id) {
      alert(
        "현재 수정 중인 썸네일 입니다.\n저장 혹은 다른 썸네일 선택 후 삭제해주세요."
      );
      return;
    }
    const updatedList = thumbnailList.filter(
      (thumbnail) => thumbnail.thumbnail_id !== item.thumbnail_id
    );
    setThumbnailList(updatedList);
    localStorage.setItem(
      "thumbnails",
      JSON.stringify(
        updatedList.sort((a, b) => b.thumbnail_id - a.thumbnail_id)
      )
    );
  };

  return (
    <div className="list-item">
      <img src={item.img} />
      <div>
        <p>{item.name}</p>
        <p>{new Date(item.createDateTime).toLocaleDateString()}</p>
      </div>
      <div className="button_wrapper">
        <TbEdit size="20" color="#8189ff" onClick={handleEditThumbnail} />
        <TbTrash size="20" color="#ff9494" onClick={handleDeleteThumbnail} />
      </div>
    </div>
  );
}
