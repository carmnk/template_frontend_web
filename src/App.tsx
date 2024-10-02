import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { defaultEditorState, useEditorRendererController } from "@cmk/fe_utils";
import { baseComponents, transformEditorStateFromPayload } from "@cmk/fe_utils";
import { AppHtmlRenderer } from "./AppHtmlRenderer";
import axios from "axios";

const prepareSerializesState = (appData: any) => {
  const transformedState = transformEditorStateFromPayload(
    appData as any,
    defaultEditorState(),
    baseComponents
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
  useEffect(() => {
    const fetchAppData = async () => {
      try {
        console.log("fetching app data");
        const response = await axios.get("/app_data.json");
        const data = response.data;
        if (!data) {
          throw new Error("No data found");
        }
        console.log("response", response);
        const serializedState = prepareSerializesState(data);
        setAppData(serializedState);
      } catch (e) {
        console.error("error", e);
      }
    };
    fetchAppData();
  }, []);

  return (
    appData && (
      <>
        <Routes>
          <Route
            path="/*"
            element={<AppHtmlRenderer appData={appData} />}
          ></Route>
        </Routes>
        <Toaster />
      </>
    )
  );
};

export default App;
