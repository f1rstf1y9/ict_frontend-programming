import React from "react";
import "../styles/ThumbnailItem.css";

export default function ThumbnailItem() {
  return (
    <div className="list-item">
      <img src="https://catoftheday.com/archive/2024/MayImages/16s.jpg"></img>
      <div>
        <p>썸네일 제목</p>
        <p>2024.08.02</p>
      </div>
    </div>
  );
}
