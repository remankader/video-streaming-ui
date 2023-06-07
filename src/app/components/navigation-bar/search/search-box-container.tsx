"use client";

import {
  ArrowUturnLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import SearchBox from "./search-box";

export default function SearchBoxContainer() {
  const [searchBoxVisible, setSearchBoxVisible] = useState<boolean>(false);

  return (
    <div className="w-full">
      {/* search box for desktop view */}
      <div className="w-full hidden md:block">
        <SearchBox />
      </div>

      {/* expandable search box for mobile view */}
      <div className="md:hidden">
        <div
          className={`w-full flex absolute left-0 right-0 top-0 bottom-0 md:relative
      bg-white dark:bg-gray-800 ${searchBoxVisible ? "" : "hidden"}`}
        >
          <div className={searchBoxVisible ? "" : "hidden"}>
            <button
              type="button"
              className="buttonLight !p-3 mr-2"
              onClick={() => setSearchBoxVisible(false)}
            >
              <ArrowUturnLeftIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          <SearchBox />
        </div>

        <div>
          <button
            type="button"
            className={`buttonLight !p-3 ${searchBoxVisible ? "hidden" : ""}`}
            onClick={() => setSearchBoxVisible(true)}
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
