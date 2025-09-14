// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
      {/* Spinning gradient ring */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin" />
        <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900" />
      </div>
    </div>
  );
}
