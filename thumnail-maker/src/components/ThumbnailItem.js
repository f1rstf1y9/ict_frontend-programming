import React from "react";
import "../styles/ThumbnailItem.css";

export default function ThumbnailItem({ item }) {
  return (
    <div className="list-item">
      <img src={item.img} />
      <div>
        <p>{item.name}</p>
        <p>{new Date(item.createDateTime).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
