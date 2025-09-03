import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditCourseModal({ course, onClose, onSave  }) {
  const [courseName, setCourseName] = useState(course?.name || "");
  const [phone, setPhone] = useState(course?.phone || "");
  const [coverImage, setCoverImage] = useState(course?.image || null);
  const [imageFile, setImageFile] = useState(null); // store actual file
  const [loading, setLoading] = useState(false);

  // handle new image
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0])); // preview
      setImageFile(e.target.files[0]); // keep file for API
    }
  };
  // convert file → base64
  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      let base64Image = null;
      if (imageFile) {
        base64Image = await fileToBase64(imageFile);
      }
      const payload = {
        object_id: course?.id, 
        table_name: "carwash.user",
        data: {
          name: courseName,
          phone: phone,
          image: base64Image || course.image, 
        },
      };
      console.log("Update Payload:", payload);
      const res = await axios.post(
        "https://carwashapis.gosmart.ae/Update_record",
        payload
      );
      toast.success("Record updated successfully!");
      console.log("API Response:", res.data);
      const updatedCourse = {
        ...course,
        name: courseName,
        phone :phone,
        image: base64Image || course.image,
      };
      onSave(updatedCourse);
      onClose();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      toast.error("Failed to update record!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-xs md:max-w-2xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>

        {coverImage ? (
          <img
            src={coverImage}
            alt="Cover Preview"
            className="w-full h-32 md:h-48 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-32 md:h-48 bg-gray-100 flex items-center justify-center text-gray-400 rounded mb-4">
            No cover image selected
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full border rounded px-3 py-2 text-sm"
        />

        <label className="block font-medium mb-1 text-sm text-gray-700">
          Name
        </label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="mb-4 w-full border rounded px-3 py-2 text-sm"
        />

        <label className="block font-medium mb-1 text-sm text-gray-700">
          Phone
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-4 w-full border rounded px-3 py-2 text-sm"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-sec hover:bg-hoverSec text-white rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
