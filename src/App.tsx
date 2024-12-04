import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ComponentDefType, defaultEditorState } from "@cmk/fe_utils";
import { baseComponents, transformEditorStateFromPayload } from "@cmk/fe_utils";
import { AppHtmlRenderer } from "./AppHtmlRenderer";
import axios from "axios";
import packageJson from "../package.json";

const prepareSerializesState = (appData: any) => {
  console.log(
    "response editorstate pre-prep",
    appData,
    defaultEditorState(),
    baseComponents
  );
  const transformedState = transformEditorStateFromPayload(
    appData as any,
    defaultEditorState(),
    baseComponents as ComponentDefType[]
  );
  return {
    ...transformedState,
    attributes: transformedState.attributes.map((attr: any) => {
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
};

export const App = () => {
  const [appData, setAppData] = React.useState<any>(null);
  const [iconData, setIconData] = React.useState<Record<string, string>>({});
  useEffect(() => {
    const basePath = packageJson.homepage ? packageJson.homepage + "/" : "/";
    const fetchAppData = async () => {
      try {
        console.log("fetching app data");
        const url = `${basePath || "/"}app_data.json`;
        const response = await axios.get(url);
        const data = response.data;
        if (!data) {
          throw new Error("No data found");
        }
        console.log("response editorstate", data);
        const serializedState = prepareSerializesState(data);
        console.log("response editorstate prepared", serializedState);
        setAppData(serializedState);
      } catch (e) {
        console.error("error", e);
      }
    };
    const fetchIconData = async () => {
      try {
        console.log("fetching icon data");
        const url = `${basePath || "/"}mdi_icons.json`;
        const response = await axios.get(url);
        const data = response.data;
        if (!data) {
          throw new Error("No data found");
        }
        console.log("response", response, data);
        const iconData = data;
        setIconData(iconData);
      } catch (e) {
        console.error("error", e);
      }
    };
    fetchAppData();
    fetchIconData();
  }, []);

  return (
    appData && (
      <>
        <Routes>
          <Route
            path="/*"
            element={<AppHtmlRenderer appData={appData} mdiIcons={iconData} />}
          ></Route>
        </Routes>
        <Toaster />
      </>
    )
  );
};

export default App;
