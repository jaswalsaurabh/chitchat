import React, { useState, ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  position: "top" | "left" | "right" | "bottom";
}

export default function Tooltip({
  content,
  children,
  position,
}: TooltipProps): JSX.Element {
  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "bottom":
      default:
        return "top-10 left-1/2 -translate-x-1/2";
    }
  };
  return (
    <div className="group relative flex max-w-max flex-col items-center justify-center">
      {children}
      <div
        className={`absolute ${getPositionClass()} ml-auto mr-auto min-w-max scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100`}
      >
        <div className="flex max-w-xs flex-col items-center shadow-lg">
          <div className="clip-bottom h-1 w-2 bg-gray-800"></div>
          <div className="rounded bg-gray-800 p-1 text-center text-xs text-white">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
