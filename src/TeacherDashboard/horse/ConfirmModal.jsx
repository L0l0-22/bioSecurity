import React from "react";

export default function ConfirmModal({ 
  isOpen, 
  title = "Confirm Action", 
  message = "Are you sure?", 
  onCancel, 
  onConfirm, 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  confirmColor = "bg-red-500 hover:bg-red-600", 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
    <div className="bg-white dark:bg-[#202226] rounded-xl shadow-lg w-full max-h-[90vh] overflow-auto max-w-xs sm:max-w-xl md:max-w-2xl my-10 p-8 relative text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {title}
        </h2>

        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
        {message}
        </p>

        <div className="flex justify-center sm:justify-end gap-3">
        <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
        >
            {cancelText}
        </button>
        <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-lg text-white font-semibold transition ${confirmColor}`}
        >
            {confirmText}
        </button>
        </div>
    </div>
    </div>

  );
}
