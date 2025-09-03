// HorseSection.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import horse1 from "../../assets/images/horses/horse33.jpeg";
import horse2 from "../../assets/images/horses/horse55.jpg";
import HorseModal from "./HorseModal";
import { IoMdAdd } from "react-icons/io";
import AddModal from "../check/AddModal";

export default function HorseSection() {
  const [view, setView] = useState("list"); // 'list' | 'details'
  const [isOpen, setIsOpen] = useState(false);
  const [horseImagePreview, setHorseImagePreview] = useState("");
  const [open, setOpen] = useState(false);
  const [accordions, setAccordions] = useState({
    data: false,
    reg: false,
    pricing: false,
    notes: true,
  });

  const horses = useMemo(
    () => [
      { name: "Horse Name 1", age: 9, gender: "Male", img: horse1, heightCm: 123, weightKg: 111 },
      { name: "Horse Name 1", age: 9, gender: "Male", img: horse2, heightCm: 123, weightKg: 111 },
      { name: "Horse Name 1", age: 9, gender: "Male", img: horse1, heightCm: 123, weightKg: 111 },
      { name: "Horse Name 1", age: 9, gender: "Male", img: horse2, heightCm: 123, weightKg: 111 },
      { name: "Horse Name 1", age: 9, gender: "Male", img: horse1, heightCm: 123, weightKg: 111 },
      { name: "Horse Name 1", age: 9, gender: "Male", img: horse2, heightCm: 123, weightKg: 111 },
      { name: "Horse Name 2", age: 7, gender: "Female", img: horse2, heightCm: 123, weightKg: 111 },
    ],
    []
  );

  const [selectedHorse, setSelectedHorse] = useState(null);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setHorseImagePreview("");
  }, []);

  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeModal]);

  const toggleAccordion = (key) =>
    setAccordions((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setHorseImagePreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  const showDetails = (horse) => {
    setSelectedHorse(horse);
    setView("details");
  };

  const backToList = () => {
    setSelectedHorse(null);
    setView("list");
  };

  const [editMode, setEditMode] = useState(false);
  const [editedHorse, setEditedHorse] = useState({});

  useEffect(() => {
    if (selectedHorse) {
      setEditedHorse({ ...selectedHorse });
    }
  }, [selectedHorse]);

  const handleSave = () => {
    console.log("Saving changes:", editedHorse);
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditedHorse({ ...editedHorse, img: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="message" className="text-gray-900 dark:text-gray-100">
      {/* Header with Add button */}
      <div className="add-horse-btn-section mb-12 flex items-center justify-between">
        <h6 className="title-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Horse Details
        </h6>
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-md bg-main px-3 py-1 text-xl font-medium text-white hover:opacity-90 dark:bg-main"
        >
          <IoMdAdd />
          Add Horse
        </button>
      </div>

      {/* ================= LIST VIEW ================= */}
      {view === "list" && (
        <div id="horse-list" className="flexing-horses cursor-pointer">
          {horses.map((h, i) => (
            <div
              key={`${h.name}-${i}`}
              className="horse-container dark:bg-gray-900 dark:border dark:border-gray-800 dark:text-gray-100"
              onClick={() => showDetails(h)}
            >
              <div className="horse-img-container">
                <img src={h.img} alt={h.name} className="rounded-md" />
              </div>
              <div className="bottom-sec text-gray-800 dark:text-gray-200">
                <h5 className="dark:text-gray-100">{h.name}</h5>
                <span className="dark:text-gray-300">
                  {h.age} years old <span className="dark:text-gray-400">, {h.gender}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================ DETAILS VIEW ================ */}
      {view === "details" && selectedHorse && (
        <div id="horse-details" className="p-4">
          <div
            id="details-card"
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-[0_0_15px_2px_rgba(0,0,0,0.2)] dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              {/* Title + subtitle */}
              <div className="mb-4">
                {editMode ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedHorse.name}
                      onChange={(e) =>
                        setEditedHorse({ ...editedHorse, name: e.target.value })
                      }
                      className="w-full rounded border border-gray-300 p-2 text-3xl font-bold text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedHorse.age}
                        onChange={(e) =>
                          setEditedHorse({ ...editedHorse, age: e.target.value })
                        }
                        className="w-16 rounded border border-gray-300 p-1 text-lg text-main dark:border-gray-700 dark:bg-gray-900 dark:text-main"
                      />
                      <span className="text-lg text-main">years |</span>
                      <input
                        type="text"
                        value={editedHorse.gender}
                        onChange={(e) =>
                          setEditedHorse({ ...editedHorse, gender: e.target.value })
                        }
                        className="w-20 rounded border border-gray-300 p-1 text-lg text-main dark:border-gray-700 dark:bg-gray-900 dark:text-main"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="mb-1 text-3xl font-bold text-gray-800 dark:text-gray-100">
                      {selectedHorse.name}
                    </h1>
                    <div className="text-lg font-light text-main">
                      {selectedHorse.age} years | {selectedHorse.gender}
                    </div>
                  </>
                )}
              </div>

              {/* Actions row */}
              <div className="mb-4 flex justify-end gap-2">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="rounded-md bg-main px-4 py-2 font-medium text-white transition-colors hover:opacity-90 dark:bg-main"
                >
                  Add Check Point
                </button>
                {editMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      type="button"
                      className="rounded-md bg-green-500 px-4 py-2 font-medium text-white transition-colors hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      type="button"
                      className="rounded-md bg-gray-500 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      type="button"
                      className="rounded-md bg-main px-4 py-2 font-medium text-white transition-colors hover:opacity-90 dark:bg-main"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Horse Data box */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Horse Data
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-3">
                  {/* Column 1 */}
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Horse No" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Breeder" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Training For" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Offspring No" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Horse No: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Breeder: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Training For: ----</p>
                        <p className="text-gray-700 dark:text-gray-300">Offspring No: ----</p>
                      </>
                    )}
                  </div>
                  {/* Column 2 */}
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Color" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Breed" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Training Level" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Deworming Data" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Color: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Breed: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Training Level: ----</p>
                        <p className="text-gray-700 dark:text-gray-300">Deworming Data: ----</p>
                      </>
                    )}
                  </div>
                  {/* Image */}
                  <div className="w-64">
                    <img
                      src={selectedHorse.img}
                      alt={selectedHorse.name}
                      className="h-auto w-full rounded-lg shadow-md"
                    />
                    {editMode && (
                      <input
                        type="file"
                        className="mt-2 w-full rounded border border-gray-300 p-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        onChange={handleImageUpload}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Info box */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Registration Info
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Microchip" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Passport No" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Horse Owner" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Vet" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Microchip: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Passport No: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Horse Owner: ----</p>
                        <p className="text-gray-700 dark:text-gray-300">Vet: ----</p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="UELN" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Passport Expiry Date" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Trainer" />
                        <input
                          type="text"
                          value={editedHorse.heightCm}
                          onChange={(e) =>
                            setEditedHorse({ ...editedHorse, heightCm: e.target.value })
                          }
                          className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                          placeholder="Height"
                        />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">UELN: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                          Passport Expiry Date: ----
                        </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Trainer: ----</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Height: {selectedHorse.heightCm} cm
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="FEI No" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Association" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Rider" />
                        <input
                          type="text"
                          value={editedHorse.weightKg}
                          onChange={(e) =>
                            setEditedHorse({ ...editedHorse, weightKg: e.target.value })
                          }
                          className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                          placeholder="Weight"
                        />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">FEI No: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Association: ----</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Rider: ----</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          Weight: {selectedHorse.weightKg} Kg
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Details box */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Pricing Details
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Purchase Price" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="DNA" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Purchase Price: 0 AED</p>
                        <p className="text-gray-700 dark:text-gray-300">DNA: ----</p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Offered Price" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Comments" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">Offered Price: 0 AED</p>
                        <p className="text-gray-700 dark:text-gray-300">Comments: ----</p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Sold Price" />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">Sold Price: 0 AED</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Back button */}
            <div className="mt-4">
              <button
                type="button"
                className="rounded bg-gray-700 px-4 py-2 text-white transition-colors hover:opacity-90 dark:bg-gray-700"
                onClick={backToList}
              >
                Back to Horses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --------------- Add Horse Modal --------------- */}
      <HorseModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        horseImagePreview={horseImagePreview}
        accordions={accordions}
        toggleAccordion={toggleAccordion}
      />
      <AddModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
