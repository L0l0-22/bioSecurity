import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";

export default function NewCourseModal({ onClose, onAddCourse }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isArchive, setIsArchive] = useState(false);
  const [image, setImage] = useState(null);   // preview URL
  const [imageFile, setImageFile] = useState(null); // actual file object
  const TABLE_NAME = "carwash.user";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("📂 File selected:", file);

    if (file) {
      setImageFile(file); // store original file
      const previewUrl = URL.createObjectURL(file); //This creates a temporary local URL (blob URL) that points to the file stored in memory.
      setImage(previewUrl); // store preview URL
      console.log("✅ Preview URL created:", previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const data = {
        name,
        phone,
        password,
        confirm_password: confirmPassword,
        is_archive: isArchive,
        create_date: new Date().toISOString(),
      };

      if (imageFile) {
        // convert to base64 string
        const reader = new FileReader(); //FileReader is a built-in JS API that can read the contents of files
        reader.onloadend = async () => {
          data.image = reader.result; // base64 string
          console.log("🖼 Base64 image added to data");
          const payload = {
            table_name: TABLE_NAME,
            data,
          };
          console.log(" Final Payload:", payload);
          try {
            const res = await axios.post(
              "https://carwashapis.gosmart.ae/create_record",
              payload
            );
            console.log("✅ API Response:", res.data);
            toast.success("Record created successfully!");
            onAddCourse(res.data);
            onClose();
          } catch (err) {
            console.error("❌ API Error:", err.response?.data || err.message);
            toast.error("Failed to create record!");
          }
        };
        reader.readAsDataURL(imageFile);
      } else {
        const payload = {
          table_name: TABLE_NAME,
          data,
        };
        console.log(" Final Payload (no image):", payload);

        const res = await axios.post(
          "https://carwashapis.gosmart.ae/create_record",
          payload
        );
        console.log("✅ API Response:", res.data);

        toast.success("Record created successfully!");
        onAddCourse(res.data);
        onClose();
      }
    } catch (err) {
      console.error("❌ Error in handleSubmit:", err);
      toast.error("Unexpected error!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-xs md:max-w-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-main">Add New Course</h2>
          <button
            onClick={onClose}
            className=" text-gray-400 hover:text-gray-600"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Preview */}
        {image ? (
          <img
            src={image}
            alt="Preview"
            className="w-full h-32 md:h-48 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-32 md:h-48 bg-gray-100 text-gray-400 flex items-center justify-center rounded mb-4">
            No cover selected
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleFileChange}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-sec"
              checked={isArchive}
              onChange={(e) => setIsArchive(e.target.checked)}
            />
            Archive?
          </label>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-sec hover:bg-hoverSec text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
