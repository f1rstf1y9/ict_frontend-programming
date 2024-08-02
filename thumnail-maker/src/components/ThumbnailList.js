import React from "react";
import "../styles/ThumbnailList.css";
import ThumbnailItem from "./ThumbnailItem";

export default function ThumbnailList({ thumbnailList }) {
  return (
    <div className="thumbnail-list">
      <p className="list-title">My 썸네일 리스트</p>
      <div className="item-wrapper">
        {thumbnailList.map((item) => (
          <ThumbnailItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
