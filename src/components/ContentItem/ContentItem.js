import React, { useState } from "react";
import "./ContentItem.css";

const ContentItem = ({ item }) => {
  if (!item) {
    return null;
  }

  const posterUrl =
    item["poster-image"] === "posterthatismissing.jpg"
      ? "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"
      : `https://test.create.diagnal.com/images/${item["poster-image"]}`;

  return (
    <div className="content-item">
      <img src={posterUrl} alt={item.name} className="poster-image" />
      <h3>{item.name}</h3>
    </div>
  );
};

export default ContentItem;
