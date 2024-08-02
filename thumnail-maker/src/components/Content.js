import React from "react";
import "../styles/Content.css";
import ThumbnailPreview from "./ThumbnailPreview";
import ThumbnailController from "./ThumbnailController";

export default function Content({ thumbnailList, setThumbnailList }) {
  return (
    <div className="container">
      <ThumbnailPreview />
      <ThumbnailController
        thumbnailList={thumbnailList}
        setThumbnailList={setThumbnailList}
      />
    </div>
  );
}
