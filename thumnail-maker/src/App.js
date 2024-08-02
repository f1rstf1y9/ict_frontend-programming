import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
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
  }
  return state;
}

function App() {
  const [thumbnailList, setThumbnailList] = useState([]);

  useEffect(() => {
    const thumbnails = localStorage.getItem("thumbnails");
    setThumbnailList(thumbnails);
  }, []);

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

  const [thumbnail, dispatch] = useReducer(reducer, {
    id: 0,
    name: "",
    title: "제목",
    subTitle: "소제목",
    bgColor: "#fff",
    titleColor: "#000",
    subTitleColor: "#000",
    isTitleShadows: false,
  });

  return (
    <div className="App">
      <ThumbnailStateContext.Provider value={{ thumbnail }}>
        <ThumbnailDispatchContext.Provider
          value={{
            onChangeName,
            onChangeTitle,
            onChangeSubTitle,
            onChangeBgColor,
            onChangeTitleColor,
            onChangeSubTitleColor,
            onChangeTitleShadows,
          }}
        >
          <Header />
          <div className="main">
            <Content
              thumbnailList={thumbnailList}
              setThumbnailList={setThumbnailList}
            />
            <ThumbnailList
              thumbnailList={thumbnailList}
              setThumbnailList={setThumbnailList}
            />
          </div>
        </ThumbnailDispatchContext.Provider>
      </ThumbnailStateContext.Provider>
    </div>
  );
}

export default App;
