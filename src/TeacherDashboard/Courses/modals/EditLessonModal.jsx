// components/EditLessonModal.jsx
import React from "react";

const EditLessonModal = ({
  selectedLesson,
  previewVideoURL,
  setPreviewVideoURL,
  setEditLessonModal,
  editedLessonName,
  setEditedLessonName,
  setNewVideoFile,
  handleEditLessonSubmit,
}) => {
  return (
    selectedLesson && (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-main">Edit Lesson</h2>

          {previewVideoURL && (
            <>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Video Preview
              </label>
              <video src={previewVideoURL} controls className="w-full rounded mb-4" />
            </>
          )}

          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Upload New Video (optional)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const videoURL = URL.createObjectURL(file);
                setNewVideoFile(file);
                setPreviewVideoURL(videoURL);
              }
            }}
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <label className="text-sm font-semibold text-gray-700 mb-2">
            Lesson Name
          </label>
          <input
            type="text"
            value={editedLessonName}
            onChange={(e) => setEditedLessonName(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          />

          <div className="flex justify-end">
            <button
              onClick={handleEditLessonSubmit}
              className="bg-sec hover:bg-hoverSec text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditLessonModal(false);
                setPreviewVideoURL("");
                setNewVideoFile(null);
              }}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditLessonModal;
