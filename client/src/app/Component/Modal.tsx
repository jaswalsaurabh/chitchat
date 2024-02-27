"use client";

import React from "react";

export default function DropdownComponent() {
  return (
    <div className="inline-flex relative z-22 bg-white border rounded-md">
      <a
        href="#"
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md"
      >
        Option
      </a>

      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
        ></button>

        <div className="absolute right-0 z-30 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
          <div className="relative z-40 p-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              ReactJS Dropdown 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              ReactJS Dropdown 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              ReactJS Dropdown 3
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
