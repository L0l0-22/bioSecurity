import React, { useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md"; 

export default function SuccessModal({ isOpen, onClose, title = "", message = "", type = "" }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#202226] rounded-2xl shadow-2xl w-full max-w-md p-6 text-center relative animate-fade-in-down">
        <div className="flex justify-end w-full">
            <button onClick={onClose} aria-label="Close"
                className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 text-xl">
                ✕
            </button>
        </div>
        <div className="flex justify-center mb-4">
            <div className={`h-20 w-20 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow
                ${type === "success" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                {type === "success" ? (
                <GiCheckMark className="h-12 w-12 text-green-600 dark:text-green-400" />
                ) : (
                <MdErrorOutline className="h-12 w-12 text-red-600 dark:text-red-400" />
                )}
            </div>
        </div>
        <h2 className={`text-2xl font-extrabold mb-2 ${
            type === "success" ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
        }`}>
            {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
      </div>
    </div>
  );
}
