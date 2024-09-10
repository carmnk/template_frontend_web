import React, { Dispatch, SetStateAction } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EditorStateType, HtmlRenderer } from "@cmk/fe_utils";
import { EditorRendererControllerType } from "@cmk/fe_utils";

export type AppHtmlRendererProps = {
  editorState: EditorStateType;
  setEditorState: Dispatch<SetStateAction<EditorStateType>>;
  selectedElement: EditorRendererControllerType<[]>["selectedElement"];
  selectedPageElements: EditorRendererControllerType<
    []
  >["selectedPageElements"];
  currentViewportElements: EditorRendererControllerType<
    []
  >["currentViewportElements"];
  appController: EditorRendererControllerType<[]>["appController"];
  COMPONENT_MODELS: EditorRendererControllerType<[]>["COMPONENT_MODELS"];
};

export const AppHtmlRenderer = (props: AppHtmlRendererProps) => {
  const {
    editorState,
    setEditorState,
    selectedElement,
    selectedPageElements,
    currentViewportElements,
    appController,
    COMPONENT_MODELS,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const theme = editorState.theme;
  const adjPathName =
    location.pathname === "/"
      ? "index"
      : location.pathname.startsWith("/")
      ? location.pathname.slice(1)
      : location.pathname;

  return (
    <HtmlRenderer
      editorState={editorState}
      setEditorState={setEditorState}
      selectedElement={selectedElement}
      selectedPageElements={selectedPageElements}
      currentViewportElements={currentViewportElements}
      appController={appController}
      // actions={actions}
      COMPONENT_MODELS={COMPONENT_MODELS}
      OverlayComponent={null as any}
      navigate={navigate}
      pageName={adjPathName}
      theme={theme}
      isProduction
    />
  );
};
