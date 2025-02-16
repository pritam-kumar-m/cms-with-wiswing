"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

const SunEditorComponent = ({ value, onChange }) => {
  const [editorContent, setEditorContent] = useState(value);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  const handleChange = (content) => {
    setEditorContent(content);
    onChange(content);
  };

  return (
    <SunEditor
      setContents={editorContent}
      onChange={handleChange}
      setOptions={{
        height: "500px",
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
        ],
      }}
    />
  );
};

export default SunEditorComponent;