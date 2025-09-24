import React, { ReactNode, useState } from "react";

interface InfoBoxProps {
  message: string | ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ message }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed top-20 right-4 bg-white border border-gray-300 shadow-lg rounded-lg p-3 w-56 z-50 transition-all duration-300">
      {/* <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="font-semibold text-gray-900">Info</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </div> */}
      <div
        className={`transition-all duration-300 ${
          isExpanded
            ? "max-h-100 opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
        style={{ scrollbarWidth: "thin" /* Firefox */ }}
      >
        <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
          {message}
        </p>
      </div>
    </div>
  );
};

export default InfoBox;
