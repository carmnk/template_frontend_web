import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import appData from "./app_data.json";
import { defaultEditorState, useEditorRendererController } from "@cmk/fe_utils";
import { baseComponents, transformEditorStateFromPayload } from "@cmk/fe_utils";
import { AppHtmlRenderer } from "./AppHtmlRenderer";

const transformedState = transformEditorStateFromPayload(
  appData as any,
  defaultEditorState(),
  baseComponents
);
const appDataAdj = {
  ...transformedState,
  attributes: transformedState.attributes.map((attr) => {
    try {
      const attrValue =
        attr.attr_name === "style" && typeof attr.attr_value === "string"
          ? JSON.parse(attr.attr_value)
          : attr.attr_value;
      return {
        ...attr,
        attr_value: attrValue,
      };
    } catch (e) {
      console.error("error", e);
    }
    return attr;
  }),
};

function App() {
  const {
    editorState,
    selectedElement,
    setEditorState,
    selectedPageElements,
    currentViewportElements,
    appController,
    COMPONENT_MODELS,
  } = useEditorRendererController({
    initialEditorState: appDataAdj as any,
  });

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <AppHtmlRenderer
              editorState={editorState}
              setEditorState={setEditorState}
              selectedElement={selectedElement}
              selectedPageElements={selectedPageElements}
              currentViewportElements={currentViewportElements}
              appController={appController}
              COMPONENT_MODELS={COMPONENT_MODELS}
            />
          }
        ></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
