import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

export default function HorseModal({ isOpen, closeModal , onHorseAdded }) {
const [accordions, setAccordions] = useState({
    data: true,
    registration: false,
    pricing: false,
    notes: false,
});
const [formData, setFormData] = useState({
  name: "",
  horse_no: "",
  currency_id: 1,        // integer
  training_for: "",
  offspring_no: "",
  color: "",
  breed: "",
  training_level: "",
  deworming_data: "",
  age: "",
  gender: "",
  microchip: "",
  passport_no: "",
  passport_expiry_date: "",
  height_cm: "",
  fei_no: "",
  ueln: "",
  association: "",
  weight_kg: "",
  purchase_price: "",
  offered_price: "",
  dna: "",
  comments: "",
  image: "",              // will hold base64 string if you want to send file
});
// handle input changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

// handle submit
const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    name: formData.name,
    horse_no: formData.horse_no,
    currency_id: Number(formData.currency_id) || null,
    training_for: formData.training_for,
    offspring_no: formData.offspring_no ? Number(formData.offspring_no) : null,
    color: formData.color,
    breed: formData.breed,
    training_level: formData.training_level,
    deworming_data: formData.deworming_data,
    age: formData.age ? Number(formData.age) : null,
    gender: formData.gender,
    microchip: formData.microchip,
    passport_no: formData.passport_no,
    passport_expiry_date: formData.passport_expiry_date,
    height_cm: formData.height_cm ? Number(formData.height_cm) : null,
    fei_no: formData.fei_no,
    ueln: formData.ueln,
    association: formData.association,
    weight_kg: formData.weight_kg ? Number(formData.weight_kg) : null,
    purchase_price: formData.purchase_price ? Number(formData.purchase_price) : null,
    offered_price: formData.offered_price ? Number(formData.offered_price) : null,
    dna: formData.dna,
    comments: formData.comments,
    image: formData.image, // base64 string if uploaded
  };

  console.log("[HorseModal] Payload:", payload);
  try {
    const res = await axios.post("https://bioapis.gosmart.eg/api/horses/create", payload);
    console.log("[HorseModal] Success:", res.data);
    if (onHorseAdded) onHorseAdded();
    closeModal();
  } catch (err) {
    console.error("[HorseModal] Error:", err);
  }
};

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
        className="bg-white dark:bg-[#202226] rounded-xl shadow-lg w-full max-h-[90vh] overflow-auto max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl  my-10 p-6 relative"
    >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
        <h2 className="text-3xl font-bold text-main">
            <span>Add New Horse</span>
        </h2>
        <button
        onClick={closeModal}
        className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 text-xl"
        aria-label="Close"
        >
        ✕
        </button>
        </div>

        {/* Form */}
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
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
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
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
                    name="horse_no"
                    value={formData.horse_no}
                    onChange={handleChange}
                    placeholder="e.g. 12345"
                    required 
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Horse Name */}
                <div>
                    <label className="block font-medium mb-1">Horse Name</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="jack"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Breed */}
                <div>
                    <label className="block font-medium mb-1">Breed</label>
                    <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Arabian"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="block font-medium mb-1">Age</label>
                    <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="5"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />

                </div>

                {/* Gender */}
                <div>
                    <label className="block font-medium mb-1">Gender</label>
                    <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 bg-transparent"
                    >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </select>
                </div>

                {/* Color */}
                <div>
                    <label className="block font-medium mb-1">Color</label>
                    <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Bay"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Breeder */}
                <div>
                    <label className="block font-medium mb-1">Breeder</label>
                    <input
                    type="text"
                    placeholder="e.g. John Smith"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Training For */}
                <div>
                    <label className="block font-medium mb-1">Training For</label>
                    <input
                    type="text"
                    name="training_for"
                    value={formData.training_for}
                    onChange={handleChange}
                    required
                    placeholder="Jumping"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Training Level */}
                <div>
                    <label className="block font-medium mb-1">Training Level</label>
                    <input
                        type="text"
                        name="training_level"
                        value={formData.training_level}
                        onChange={handleChange}
                        placeholder="Intermediate"
                        required
                        className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                        />
                </div>

                {/* Offspring No */}
                <div>
                    <label className="block font-medium mb-1">Offspring No</label>
                    <input
                    type="number"
                    name="offspring_no"
                    value={formData.offspring_no}
                    onChange={handleChange}
                    required
                    placeholder="2"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Deworming Date */}
                <div>
                    <label className="block font-medium mb-1">Deworming Date</label>
                    <input
                    type="text"
                    name="deworming_data"
                    required
                    value={formData.deworming_data}
                    onChange={handleChange}
                    placeholder="Done in Aug 2025"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
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
                    name="microchip"
                    value={formData.microchip}
                    onChange={handleChange}
                    required
                    placeholder="123456789012345"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* UELN */}
                <div>
                    <label className="block font-medium mb-1">UELN</label>
                    <input
                    type="text"
                    name="ueln"
                    value={formData.ueln}
                    onChange={handleChange}
                    required
                    placeholder="UELN123456"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* FEI No */}
                <div>
                    <label className="block font-medium mb-1">FEI No</label>
                    <input
                    type="text"
                    name="fei_no"
                    value={formData.fei_no}
                    onChange={handleChange}
                    required
                    placeholder="FEI12345"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Passport No */}
                <div>
                    <label className="block font-medium mb-1">Passport No</label>
                    <input
                    type="text"
                    name="passport_no"
                    value={formData.passport_no}
                    onChange={handleChange}
                    placeholder="P1234567"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Passport Expiry */}
                <div>
                    <label className="block font-medium mb-1">Passport Expiry</label>
                    <input
                    type="date"
                    name="passport_expiry_date"
                    value={formData.passport_expiry_date}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Association */}
                <div>
                    <label className="block font-medium mb-1">Association</label>
                    <input
                    type="text"
                    name="association"
                    value={formData.association}
                    onChange={handleChange}
                    required
                    placeholder="National Horse Club"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Horse Owner */}
                <div>
                    <label className="block font-medium mb-1">Horse Owner</label>
                    <input
                    type="text"
                    placeholder="e.g. John Smith"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Trainer */}
                <div>
                    <label className="block font-medium mb-1">Trainer</label>
                    <input
                    type="text"
                    placeholder="e.g. Jane Doe"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Rider */}
                <div>
                    <label className="block font-medium mb-1">Rider</label>
                    <input
                    type="text"
                    placeholder="e.g. Mark Rider"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Vet */}
                <div>
                    <label className="block font-medium mb-1">Vet</label>
                    <input
                    type="text"
                    placeholder="e.g. Dr. Vet"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Height */}
                <div>
                    <label className="block font-medium mb-1">Height (cm)</label>
                    <input
                    type="number"
                    step="0.1"
                    name="height_cm"
                    value={formData.height_cm}
                    required
                    onChange={handleChange}
                    placeholder="160.5"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Weight */}
                <div>
                    <label className="block font-medium mb-1">Weight (kg)</label>
                    <input
                    type="number"
                    step="0.1"
                    name="weight_kg"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    required
                    placeholder="450"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
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
                    name="purchase_price"
                    value={formData.purchase_price}
                    onChange={handleChange}
                    placeholder="10000"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Offered Price */}
                <div>
                    <label className="block font-medium mb-1">Offered Price (AED)</label>
                    <input
                    type="number"
                    name="offered_price"
                    value={formData.offered_price}
                    onChange={handleChange}
                    required
                    placeholder="12000"
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                    />
                </div>

                {/* Sold Price */}
                <div>
                    <label className="block font-medium mb-1">Sold Price (AED)</label>
                    <input
                    type="number"
                    placeholder="e.g. 12345"
                    required
                    className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
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
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Very calm temperament"
                required
                rows="3"
                className="w-full border rounded-lg p-2 bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                />
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
