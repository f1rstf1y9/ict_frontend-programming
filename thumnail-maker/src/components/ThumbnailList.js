import React from "react";
import "../styles/ThumbnailList.css";
import ThumbnailItem from "./ThumbnailItem";

export default function ThumbnailList({ thumbnailList, setThumbnailList }) {
  return (
    <div className="thumbnail-list">
      <h1>🪄썸네일 메이커</h1>
      <p className="list-title">My 썸네일 리스트</p>
      <div className="item-wrapper">
        {thumbnailList.map((item) => (
          <ThumbnailItem
            key={item.thumbnail_id}
            item={item}
            thumbnailList={thumbnailList}
            setThumbnailList={setThumbnailList}
          />
        ))}
      </div>
    </div>
  );
}
