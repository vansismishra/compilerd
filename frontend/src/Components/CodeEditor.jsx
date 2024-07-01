/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ onchange, language, code, theme }) => {
    const [value, setValue] = useState(code || "// Write your code here");

    const handleEditorChange = (newValue, event) => {
        setValue(newValue);
        onchange("code", newValue);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width="100%"
                language={language || "cpp"}
                value={value}
                theme={theme || "vs-dark"}
                options={{
                    automaticLayout: true,
                    minimap: {
                        enabled: false,
                    },
                }}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditor;