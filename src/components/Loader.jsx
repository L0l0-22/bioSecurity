// src/components/Loader.jsx
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-white/70 backdrop-blur">
      {/* 3 bouncing dots */}
      <div className="flex items-end gap-2">
        <span className="h-3 w-3 rounded-full bg-gray-900 animate-bounce [animation-delay:-0.2s]" />
        <span className="h-3 w-3 rounded-full bg-gray-900 animate-bounce [animation-delay:-0.1s]" />
        <span className="h-3 w-3 rounded-full bg-gray-900 animate-bounce" />
      </div>
    </div>
  );
}
