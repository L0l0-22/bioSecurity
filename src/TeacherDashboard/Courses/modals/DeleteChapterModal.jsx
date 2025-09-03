import React from "react";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function DeleteChapterModal({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <IoMdClose size={24} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex items-center justify-center my-5">
            <RiDeleteBin6Fill className="text-gray-300" size={45} />
          </div>
          <p className="mb-4 text-gray-500">Are you sure you want to delete this chapter?</p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={onClose}
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900"
            >
              No, cancel
            </button>
            <button
              onClick={onDelete}
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
