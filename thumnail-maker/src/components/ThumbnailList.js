import React from "react";
import "../styles/ThumbnailList.css";
import ThumbnailItem from "./ThumbnailItem";

export default function ThumbnailList() {
  return (
    <div className="thumbnail-list">
      <p className="list-title">My 썸네일 리스트</p>
      <div className="item-wrapper">
        <ThumbnailItem />
        <ThumbnailItem />
        <ThumbnailItem />
        <ThumbnailItem />
      </div>
    </div>
  );
}
