/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { statuses } from "../constants/statuses";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    // eslint-disable-next-line no-unused-vars
    const findStatusDescription = (id) => {
      const status = statuses.find((s) => s.id === id);
      return status ? status.description : "Unknown Status";
    };

    switch (statusId) {
      case 6:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {atob(outputDetails?.compile_output)}
          </pre>
        );
      case 3:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-green-500">
            {atob(outputDetails.stdout) !== null
              ? `${atob(outputDetails.stdout)}`
              : null}
          </pre>
        );
      case 5:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {"Time Limit Exceeded"}
          </pre>
        );
      default:
        return (
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {atob(outputDetails?.stderr)}
          </pre>
        );
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl bg-clip-text text-white font-mono">
        Output
      </h1>
      <div className="w-full h-56 bg-[#9f9ca1] rounded-md text-black font-normal text-sm overflow-y-auto">
        {outputDetails ? getOutput() : null}
      </div>
    </div>
  );
};

export default OutputWindow;
