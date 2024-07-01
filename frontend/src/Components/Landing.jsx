/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { statuses } from "../constants/statuses";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguageDropdown from "./LanguageDropdown";

const cppDefault = ` // write your code here`;

const Landing = () => {
    const [code, setCode] = useState(cppDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctrlPress, enterPress]);

    const onSelectChange = (selectedOption) => {
        setLanguage(selectedOption);
    };

    const onChange = (action, data) => {
        switch (action) {
            case "code":
                setCode(data);
                break;
            default:
                console.warn("Unhandled case:", action, data);
                break;
        }
    };

    const handleCompile = () => {
        setProcessing(true);

        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            stdin: btoa(customInput),
        };

        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        axios.request(options)
            .then((response) => {
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                setProcessing(false);
                console.error("Compile error:", err);
            });
    };

    const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };

        try {
            const response = await axios.request(options);
            const statusId = response.data.status?.id;

            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                showSuccessToast("Compiled Successfully!");
            }
        } catch (err) {
            console.error("Status check error:", err);
            setProcessing(false);
            showErrorToast("Error checking status. Please try again.");
        }
    };

    const handleThemeChange = (selectedTheme) => {
        if (["light", "vs-dark"].includes(selectedTheme.value)) {
            setTheme(selectedTheme.value);
        } else {
            defineTheme(selectedTheme.value).then(() => {
                setTheme(selectedTheme.value);
            }).catch((error) => {
                console.error("Theme change error:", error);
            });
        }
    };

    useEffect(() => {
        defineTheme("oceanic-next").then(() => {
            setTheme({ value: "oceanic-next", label: "Oceanic Next" });
        }).catch((error) => {
            console.error("Initial theme definition error:", error);
        });
    }, []);

    const showSuccessToast = (message) => {
        toast.success(message || "Compiled Successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showErrorToast = (message) => {
        toast.error(message || "Something went wrong! Please try again.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div className="h-4 w-full bg-gradient-to-r from pink-500 via-red-500 to-yellow-500"></div>

            <div className="flex flex-row">
                <div className="px-4 py-2">
                    <LanguageDropdown onSelectChange={onSelectChange} />
                </div>
                <div className="px-4 py-2">
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditor
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme}
                    />
                </div>

                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow outputDetails={outputDetails} />
                    <div className="flex flex-col items-end">
                        <CustomInput
                            customInput={customInput}
                            setCustomInput={setCustomInput}
                        />
                        <button
                            onClick={handleCompile}
                            disabled={!code}
                            className={classnames(
                                "mt-4 bottom-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                                !code ? "opacity-50" : ""
                            )}
                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </button>
                    </div>
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </div>
            </div>
        </>
    );
};

export default Landing;
