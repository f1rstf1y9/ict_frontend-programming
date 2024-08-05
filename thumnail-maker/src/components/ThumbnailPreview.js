import React, { useContext } from "react";
import "../styles/ThumbnailPreview.css";
import { ThumbnailStateContext } from "../App";

export default function ThumbnailPreview() {
  const { thumbnail } = useContext(ThumbnailStateContext);
  return (
    <div className="preview-wrapper">
      <div className="preview" style={{ background: `${thumbnail.bgColor}` }}>
        <p
          className="preview_title"
          style={{
            color: `${thumbnail.titleColor}`,
            textShadow: `${
              thumbnail.isTitleShadows
                ? "rgba(0, 0, 0, 0.3) 2px 2px 2px"
                : "none"
            }`,
            fontFamily: `${thumbnail.font}`,
          }}
        >
          {thumbnail.title}
        </p>
        <p
          className="preview_subtitle"
          style={{
            color: `${thumbnail.subTitleColor}`,
            fontFamily: `${thumbnail.font}`,
          }}
        >
          {thumbnail.subTitle}
        </p>
      </div>
    </div>
  );
}
