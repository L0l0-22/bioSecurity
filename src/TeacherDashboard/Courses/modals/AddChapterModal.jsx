import React from 'react';

export default function AddChapterModal({
  chapterData,
  setChapterData,
  handleAddChapter,
  setShowAddModal,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Add New Chapter</h3>
        <input
          type="text"
          placeholder="Chapter Title"
          className="w-full border rounded px-3 py-2 mb-2"
          value={chapterData.title}
          onChange={(e) =>
            setChapterData({ ...chapterData, title: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Chapter Description"
          className="w-full border rounded px-3 py-2 mb-2"
          value={chapterData.description}
          onChange={(e) =>
            setChapterData({ ...chapterData, description: e.target.value })
          }
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => setShowAddModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-sec text-white px-4 py-2 rounded hover:bg-hoverSec"
            onClick={handleAddChapter}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
