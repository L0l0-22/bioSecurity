import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HorseModal({ isOpen, closeModal }) {
const [accordions, setAccordions] = useState({
    data: true,
    registration: false,
    pricing: false,
    notes: false,
});

const toggleAccordion = (section) => {
    setAccordions((prev) => ({
    ...prev,
    [section]: !prev[section],
    }));
};

if (!isOpen) return null;

const handleBackdropClick = (e) => {
    if (e.target.id === "addHorseModal") closeModal();
};

return (
    <div
    id="addHorseModal"
    onClick={handleBackdropClick}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
    >
    <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#202226] rounded-xl shadow-lg w-full max-w-7xl my-10 p-6 relative max-h-[90vh] overflow-y-auto"
    >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
        <h2 className="text-3xl font-bold text-main">
            <span>Add New Horse</span>
        </h2>
        <button
            onClick={closeModal}
            className="text-pink-600 hover:text-pink-800 text-2xl font-bold"
        >
            &times;
        </button>
        </div>

        {/* Form */}
        <form className="mt-4 space-y-6">
        <div className="space-y-4">
            {/* ========== HORSE DATA ========== */}
            <button
            type="button"
            onClick={() => toggleAccordion("data")}
            className="w-full flex justify-between items-center p-4 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-2xl bg-gray-100 dark:bg-[#202226] hover:bg-gray-200 transition"
            >
            Horse Data
            <ChevronDown size={30}
                className={`transition-transform ${
                accordions.data ? "rotate-180" : "rotate-0"
                }`}
            />
            </button>

            {accordions.data && (
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Horse Photo with preview */}
                <div>
                    <label className="block font-medium mb-1">Horse Photo</label>
                    <input
                    type="file"
                    id="horseImage"
                    accept="image/*"
                    className="w-full border rounded-lg p-2"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            const img = document.getElementById("horseImageThumb");
                            img.src = ev.target.result;
                            document.getElementById("horseImagePreview").style.display =
                            "block";
                        };
                        reader.readAsDataURL(file);
                        }
                    }}
                    />
                    {/* Preview */}
                    <div
                    id="horseImagePreview"
                    className="hidden mt-2"
                    >
                    <img
                        id="horseImageThumb"
                        alt="Preview"
                        className="max-w-[140px] rounded-lg"
                    />
                    </div>
                </div>

                {/* Horse No */}
                <div>
                    <label className="block font-medium mb-1">Horse No</label>
                    <input
                    type="text"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Horse Name */}
                <div>
                    <label className="block font-medium mb-1">Horse Name</label>
                    <input
                    type="text"
                    placeholder="jack"
                    required
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Breed */}
                <div>
                    <label className="block font-medium mb-1">Breed</label>
                    <input
                    type="text"
                    placeholder="e.g. Arabian"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="block font-medium mb-1">Age</label>
                    <input
                    type="number"
                    placeholder="5"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block font-medium mb-1">Gender</label>
                    <select className="w-full border rounded-lg p-2 bg-transparent">
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    </select>
                </div>

                {/* Color */}
                <div>
                    <label className="block font-medium mb-1">Color</label>
                    <input
                    type="text"
                    placeholder="white"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Breeder */}
                <div>
                    <label className="block font-medium mb-1">Breeder</label>
                    <input
                    type="text"
                    placeholder="e.g. John Smith"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Training For */}
                <div>
                    <label className="block font-medium mb-1">Training For</label>
                    <input
                    type="text"
                    placeholder="e.g. Jumping"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Training Level */}
                <div>
                    <label className="block font-medium mb-1">Training Level</label>
                    <input
                    type="text"
                    placeholder="e.g. Intermediate"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Offspring No */}
                <div>
                    <label className="block font-medium mb-1">Offspring No</label>
                    <input
                    type="number"
                    placeholder="e.g. 3"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Deworming Date */}
                <div>
                    <label className="block font-medium mb-1">Deworming Date</label>
                    <input
                    type="date"
                    className="w-full border rounded-lg p-2"
                    />
                </div>
                </div>
            </div>
            )}


            {/* ========== REGISTRATION INFO ========== */}
            <button
            type="button"
            onClick={() => toggleAccordion("registration")}
            className="w-full flex justify-between items-center p-4 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-2xl bg-gray-100 dark:bg-[#202226] hover:bg-gray-200 transition"
            >
            Registration Info
            <ChevronDown size={30}
                className={`transition-transform ${
                accordions.registration ? "rotate-180" : "rotate-0"
                }`}
            />
            </button>

            {accordions.registration && (
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Microchip */}
                <div>
                    <label className="block font-medium mb-1">Microchip</label>
                    <input
                    type="text"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* UELN */}
                <div>
                    <label className="block font-medium mb-1">UELN</label>
                    <input
                    type="text"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* FEI No */}
                <div>
                    <label className="block font-medium mb-1">FEI No</label>
                    <input
                    type="text"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Passport No */}
                <div>
                    <label className="block font-medium mb-1">Passport No</label>
                    <input
                    type="text"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Passport Expiry */}
                <div>
                    <label className="block font-medium mb-1">Passport Expiry</label>
                    <input
                    type="date"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Association */}
                <div>
                    <label className="block font-medium mb-1">Association</label>
                    <input
                    type="text"
                    placeholder="e.g. FEI"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Horse Owner */}
                <div>
                    <label className="block font-medium mb-1">Horse Owner</label>
                    <input
                    type="text"
                    placeholder="e.g. John Smith"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Trainer */}
                <div>
                    <label className="block font-medium mb-1">Trainer</label>
                    <input
                    type="text"
                    placeholder="e.g. Jane Doe"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Rider */}
                <div>
                    <label className="block font-medium mb-1">Rider</label>
                    <input
                    type="text"
                    placeholder="e.g. Mark Rider"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Vet */}
                <div>
                    <label className="block font-medium mb-1">Vet</label>
                    <input
                    type="text"
                    placeholder="e.g. Dr. Vet"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Height */}
                <div>
                    <label className="block font-medium mb-1">Height (cm)</label>
                    <input
                    type="number"
                    placeholder="e.g. 160"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Weight */}
                <div>
                    <label className="block font-medium mb-1">Weight (kg)</label>
                    <input
                    type="number"
                    placeholder="e.g. 450"
                    className="w-full border rounded-lg p-2"
                    />
                </div>
                </div>
            </div>
            )}


            {/* ========== PRICING DETAILS ========== */}
            <button
            type="button"
            onClick={() => toggleAccordion("pricing")}
            className="w-full flex justify-between items-center p-4 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-2xl bg-gray-100 dark:bg-[#202226] hover:bg-gray-200 transition"
            >
            Pricing Details
            <ChevronDown size={30}
                className={`transition-transform ${
                accordions.pricing ? "rotate-180" : "rotate-0"
                }`}
            />
            </button>

            {accordions.pricing && (
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Purchase Price */}
                <div>
                    <label className="block font-medium mb-1">Purchase Price (AED)</label>
                    <input
                    type="number"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Offered Price */}
                <div>
                    <label className="block font-medium mb-1">Offered Price (AED)</label>
                    <input
                    type="number"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Sold Price */}
                <div>
                    <label className="block font-medium mb-1">Sold Price (AED)</label>
                    <input
                    type="number"
                    placeholder="e.g. 12345"
                    className="w-full border rounded-lg p-2"
                    />
                </div>
                </div>
            </div>
            )}

            {/* ========== NOTES ========== */}
            <button
            type="button"
            onClick={() => toggleAccordion("notes")}
            className="w-full flex justify-between items-center p-4 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-2xl bg-gray-100 dark:bg-[#202226] hover:bg-gray-200 transition"
            >
            Notes
            <ChevronDown size={30}
                className={`transition-transform ${
                accordions.notes ? "rotate-180" : "rotate-0"
                }`}
            />
            </button>
            {accordions.notes && (
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
                <textarea
                placeholder="e.g. 12345"
                rows="3"
                className="w-full border rounded-lg p-2"
                ></textarea>
            </div>
            )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-main hover:bg-opacity-90 text-white font-semibold"
            >
            Add Horse
            </button>
        </div>
        </form>
    </div>
    </div>
);
}
