// components/AddLessonModal.jsx
import React from "react";

const AddLessonModal = ({ lessonData, setLessonData, setLessonModal, handleAddLesson }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Add New Lesson</h3>

        <input
          type="text"
          placeholder="Lesson Title"
          className="w-full border rounded px-3 py-2 mb-2"
          value={lessonData.title}
          onChange={(e) =>
            setLessonData({ ...lessonData, title: e.target.value })
          }
          required
        />
        <input
          type="file"
          accept="video/*"
          className="w-full border rounded px-3 py-2 mb-4"
          onChange={(e) =>
            setLessonData({ ...lessonData, video: e.target.files[0] })
          }
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => setLessonModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-sec text-white px-4 py-2 rounded hover:bg-hoverSec"
            onClick={handleAddLesson}
          >
            Add Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLessonModal;
