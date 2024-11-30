import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ComponentDefType,
  HtmlRenderer,
  useEditorRendererController,
} from "@cmk/fe_utils";

export type AppHtmlRendererProps = {
  // editorState: EditorStateType;
  // setEditorState: Dispatch<SetStateAction<EditorStateType>>;
  // selectedElement: EditorRendererControllerType<[]>["selectedElement"];
  // selectedPageElements: EditorRendererControllerType<
  //   []
  // >["selectedPageElements"];
  // currentViewportElements: EditorRendererControllerType<
  //   []
  // >["currentViewportElements"];
  // appController: EditorRendererControllerType<[]>["appController"];
  // COMPONENT_MODELS: EditorRendererControllerType<[]>["COMPONENT_MODELS"];
  appData: any;
  mdiIcons: Record<string, string>;
};

export const AppHtmlRenderer = (props: AppHtmlRendererProps) => {
  const { appData, mdiIcons } = props;
  // const themeIn = useTheme();
  // const {
  //   editorState,
  //   setEditorState,
  //   selectedElement,
  //   selectedPageElements,
  //   currentViewportElements,
  //   appController,
  //   COMPONENT_MODELS,
  // } = props;

  const {
    editorState,
    // selectedElement,
    setEditorState,
    selectedPageElements,
    currentViewportElements,
    appController,
    COMPONENT_MODELS,
  } = useEditorRendererController({
    initialEditorState: appData,
  });

  const getIcon = useCallback(
    async (name: string) => {
      if (!mdiIcons[name]) {
        console.warn("getIcon", name, "not found");
        return null;
      }
      console.log("getIcon", name, mdiIcons[name]);
      return mdiIcons[name];
    },
    [mdiIcons]
  );

  


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
      uiActions={null as any}
      editorState={editorState}
      setEditorState={setEditorState}
      selectedPageElements={selectedPageElements}
      currentViewportElements={currentViewportElements}
      appController={appController}
      // actions={actions}
      COMPONENT_MODELS={COMPONENT_MODELS as ComponentDefType[]}
      OverlayComponent={null as any}
      navigate={navigate}
      pageName={adjPathName}
      theme={theme}
      isProduction
      importIconByName={getIcon as any}
    />
  );

};
