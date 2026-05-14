"use client";
import React from 'react';
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  return (
    <div>
      <label
        className="group flex items-center gap-3 h-[40px] w-[420px] pr-4 pl-3 border-2 border-[#e8ebed] rounded-[20px] focus-within:border-blue-400 transition"
        htmlFor="search"
      >
        <IoSearchOutline className="text-[20px] text-[#7c7c7c] flex-shrink-0" />
        <input
          className="block h-full flex-grow outline-none text-sm bg-transparent"
          type="text"
          id="search"
          name="search"
          placeholder="Tìm kiếm thuốc, bài viết..."
        />
      </label>
    </div>
  );
}