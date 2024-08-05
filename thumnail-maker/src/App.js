import "./App.css";
import ThumbnailPreview from "./components/ThumbnailPreview";
import ThumbnailController from "./components/ThumbnailController";
import ThumbnailList from "./components/ThumbnailList";
import React, { useReducer, useEffect, useState } from "react";

export const ThumbnailStateContext = React.createContext();
export const ThumbnailDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ChangeName":
      return { ...state, name: action.content };
    case "ChangeTitle":
      return { ...state, title: action.content };
    case "ChangeSubTitle":
      return { ...state, subTitle: action.content };
    case "ChangeBgColor":
      return { ...state, bgColor: action.color };
    case "ChangeTitleColor":
      return { ...state, titleColor: action.color };
    case "ChangeSubTitleColor":
      return { ...state, subTitleColor: action.color };
    case "ChangeTitleShadows":
      return { ...state, isTitleShadows: action.checked };
    case "ChangeFont":
      return { ...state, font: action.font };
    case "ChangeThumbnail":
      return action.thumbnail;
  }
  return state;
}

function App() {
  const [thumbnailList, setThumbnailList] = useState([]);

  useEffect(() => {
    const thumbnails = localStorage.getItem("thumbnails")
      ? JSON.parse(localStorage.getItem("thumbnails"))
      : [];
    setThumbnailList(thumbnails);
  }, []);

  const onChangeThumbnail = (thumbnail) => {
    dispatch({ type: "ChangeThumbnail", thumbnail });
  };

  const onChangeName = (content) => {
    dispatch({ type: "ChangeName", content });
  };
  const onChangeTitle = (content) => {
    dispatch({ type: "ChangeTitle", content });
  };
  const onChangeSubTitle = (content) => {
    dispatch({ type: "ChangeSubTitle", content });
  };
  const onChangeBgColor = (color) => {
    dispatch({ type: "ChangeBgColor", color });
  };
  const onChangeTitleColor = (color) => {
    dispatch({ type: "ChangeTitleColor", color });
  };
  const onChangeSubTitleColor = (color) => {
    dispatch({ type: "ChangeSubTitleColor", color });
  };
  const onChangeTitleShadows = (checked) => {
    dispatch({ type: "ChangeTitleShadows", checked });
  };
  const onChangeFont = (font) => {
    dispatch({ type: "ChangeFont", font });
  };

  const [thumbnail, dispatch] = useReducer(reducer, {
    thumbnail_id: -1,
    name: "",
    title: "제목을 입력해주세요",
    subTitle: "부제를 입력해주세요",
    bgColor: "#fff",
    titleColor: "#000",
    subTitleColor: "#000",
    isTitleShadows: false,
    font: "Pretendard-Regular",
  });

  return (
    <div className="App">
      <ThumbnailStateContext.Provider value={{ thumbnail }}>
        <ThumbnailDispatchContext.Provider
          value={{
            onChangeThumbnail,
            onChangeName,
            onChangeTitle,
            onChangeSubTitle,
            onChangeBgColor,
            onChangeTitleColor,
            onChangeSubTitleColor,
            onChangeTitleShadows,
            onChangeFont,
          }}
        >
          <ThumbnailList
            thumbnailList={thumbnailList}
            setThumbnailList={setThumbnailList}
          />
          <ThumbnailPreview />
          <ThumbnailController
            thumbnailList={thumbnailList}
            setThumbnailList={setThumbnailList}
          />
        </ThumbnailDispatchContext.Provider>
      </ThumbnailStateContext.Provider>
    </div>
  );
}

export default App;
