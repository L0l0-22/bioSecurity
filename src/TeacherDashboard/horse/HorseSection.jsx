// HorseSection.jsx
import React, { useEffect, useState } from "react";
import horseFallback from "../../assets/images/horses/horse33.jpeg";
import HorseModal from "./HorseModal";
import { IoMdAdd } from "react-icons/io";
import AddModal from "../check/AddModal";
import axios from "axios";
import Loader from "../../components/Loader";
import ConfirmModal from "./ConfirmModal";

export default function HorseSection() {
  const [view, setView] = useState("list"); // 'list' | 'details'
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteHorseId, setDeleteHorseId] = useState(null);

  const showDetails = (horse) => {
    setSelectedHorse(horse);
    setView("details");
  };
  const backToList = () => {
    setSelectedHorse(null);
    setView("list");
  };

  const API_BASE = "http://bioapis.gosmart.eg/api";

  //show data 
  useEffect(() => {
  const fetchHorses = async () => {
    console.log("[HorseSection] Fetching horses...");
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/horses`);
      const list = res?.data?.items || [];
      const mapped = list.map((h) => ({
        id: h.id,
        name: h.name ?? "—",
        horseNo: h.horse_no ?? "—",
        breederName: h.breeder_name ?? "—",
        trainingFor: h.training_for ?? "—",
        offspringNo: h.offspring_no ?? "—",
        color: h.color ?? "—",
        breed: h.breed ?? "—",
        trainingLevel: h.training_level ?? "—",
        dewormingData: h.deworming_data ?? "—",
        microchip: h.microchip ?? "—",
        passportNo: h.passport_no ?? "—",
        ownerName: h.owner_name ?? "—",
        vetName: h.vet_name ?? "—",
        ueln: h.ueln ?? "—",
        passportExpiryDate: h.passport_expiry_date ?? "",
        trainerName: h.trainer_name ?? "—",
        heightCm: h.height_cm ?? "—",
        feiNo: h.fei_no ?? "—",
        association: h.association ?? "—",
        riderName: h.rider_name ?? "—",
        weightKg: h.weight_kg ?? "—",
        currencyCode: Array.isArray(h.currency_id)
          ? h.currency_id[1] ?? "—"
          : h.currency_id ?? "—",
        purchasePrice: h.purchase_price ?? "—",
        offeredPrice: h.offered_price ?? "—",
        dna: h.dna ?? "—",
        comments: h.comments ?? "—",
        img: h.image || horseFallback,
      }));
      setHorses(mapped);
    } catch (err) {
      console.error("[HorseSection] Fetch error:", err);
      setError(err.message || "Failed to load horses");
    } finally {
      setLoading(false);
    }
  };

  fetchHorses();
  }, [API_BASE, refreshKey]); // <-- depend on refreshKey

  //delete
  const handleDelete = async (horseId) => {
  try {
    await axios.delete(`${API_BASE}/horses/${horseId}`);
    console.log("[HorseSection] Horse deleted:", horseId);

    setHorses((prev) => prev.filter((h) => h.id !== horseId));
    setView("list");
    setSelectedHorse(null);
  } catch (err) {
    console.error("[HorseSection] Delete error:", err);
    alert("Failed to delete horse");
  } finally {
    setDeleteHorseId(null); // close modal
  }
};

  

  const [editMode, setEditMode] = useState(false);
  const [editedHorse, setEditedHorse] = useState({});

  useEffect(() => {
    if (selectedHorse) {
      setEditedHorse({ ...selectedHorse });
    }
  }, [selectedHorse]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: editedHorse.name,
        horse_no: editedHorse.horseNo,
        breed: editedHorse.breed,
        color: editedHorse.color,
        age: editedHorse.age,
        gender: editedHorse.gender,
        training_for: editedHorse.trainingFor,
        training_level: editedHorse.trainingLevel,
        offspring_no: editedHorse.offspringNo,
        deworming_data: editedHorse.dewormingData,
        microchip: editedHorse.microchip,
        passport_no: editedHorse.passportNo,
        passport_expiry_date: editedHorse.passportExpiryDate,
        owner_name: editedHorse.ownerName,
        breeder_name: editedHorse.breederName,
        vet_name: editedHorse.vetName,
        ueln: editedHorse.ueln,
        trainer_name: editedHorse.trainerName,
        height_cm: editedHorse.heightCm,
        fei_no: editedHorse.feiNo,
        association: editedHorse.association,
        rider_name: editedHorse.riderName,
        weight_kg: editedHorse.weightKg,
        purchase_price: editedHorse.purchasePrice,
        offered_price: editedHorse.offeredPrice,
        dna: editedHorse.dna,
        comments: editedHorse.comments,
        image: editedHorse.img, // URL (already returned by API)
      };

    console.log("[HorseSection] Update payload:", payload);

    const res = await axios.put(`${API_BASE}/horses/${editedHorse.id}`, payload);
    console.log("[HorseSection] Horse updated:", res.data);

    // Update UI without full refresh
    setHorses((prev) =>
      prev.map((h) => (h.id === editedHorse.id ? { ...h, ...editedHorse } : h))
    );

    setSelectedHorse({ ...editedHorse });
    setEditMode(false);
  } catch (err) {
    console.error("[HorseSection] Update error:", err);
    alert("Failed to update horse");
  } finally {
    setSaving(false);
  }
};


  return (
    <section id="message" className="text-gray-900 dark:text-gray-100">
      {/* Header with Add button */}
      <div className="add-horse-btn-section mb-5 flex items-center justify-between">
        <h6 className="title-2 dark:text-gray-100">
          Horse Details
        </h6>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-3 md:mt-0 flex items-center gap-2 rounded-md bg-main px-3 py-1 text-xl font-medium text-white hover:opacity-90 dark:bg-main"
        >
          <IoMdAdd />
          Add Horse
        </button>
      </div>

      {/* ================= LIST VIEW ================= */}
      {view === "list" && (
        <>
        {loading && <Loader/>}
        {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
        <div id="horse-list" className="flexing-horses cursor-pointer">
          {horses.map((h, i) => (
            <div
              key={`${h.name}-${i}`}
              className="horse-container dark:bg-gray-900 dark:border dark:border-gray-800 dark:text-gray-100"
              onClick={() => showDetails(h)}
            >
              <div className="horse-img-container">
                <img src={h.img} alt={h.name} onError={(e)=>{e.currentTarget.src = horseFallback;}} />
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
        </>
      )}

      {/* ================ DETAILS VIEW ================ */}
      {view === "details" && selectedHorse && (
        <div id="horse-details" className="p-4">
          <div
            id="details-card"
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-[0_0_15px_2px_rgba(0,0,0,0.2)] dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Title  subtitle */}
              <div className="mb-4">
                {editMode ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedHorse.name}
                      onChange={(e) =>
                        setEditedHorse({ ...editedHorse, name: e.target.value })
                      }
                      className="w-56 rounded border border-gray-300 p-2 text-3xl font-bold text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
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
              <div className="mb-4 flex flex-col md:flex-row justify-end gap-2">
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
                      disabled={saving}
                      className={`rounded-md px-4 py-2 font-medium text-white transition-colors ${
                        saving
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {saving ? "Saving..." : "Save"}
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
                      onClick={() => setDeleteHorseId(selectedHorse.id)}
                      className="rounded bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            <ConfirmModal
              isOpen={!!deleteHorseId}
              title="Delete Horse"
              message="Are you sure you want to delete this horse ?"
              confirmText="Delete"
              cancelText="Cancel"
              confirmColor="bg-red-500 hover:bg-red-600"
              onCancel={() => setDeleteHorseId(null)}
              onConfirm={() => handleDelete(deleteHorseId)}
            />


            {/* Horse Data box */}
            <div className="mb-4 rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-200 bg-gray-200 p-4 dark:border-gray-800 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Horse Data
                </h3>
              </div>
              <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2 grid grid-cols-1 gap-y-6 md:grid-cols-2">
                  {/* Column 1 */}
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.horseNo} onChange={(e)=>setEditedHorse({...editedHorse, horseNo:e.target.value})} placeholder="Horse No" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.breederName} onChange={(e)=>setEditedHorse({...editedHorse, breederName:e.target.value})} placeholder="Breeder" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.trainingFor} onChange={(e)=>setEditedHorse({...editedHorse, trainingFor:e.target.value})} placeholder="Training For" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.offspringNo} onChange={(e)=>setEditedHorse({...editedHorse, offspringNo:e.target.value})} placeholder="Offspring No" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"> <span className="font-semibold">Horse No:</span>  {selectedHorse.horseNo}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"> <span className="font-semibold">Breeder:</span> {selectedHorse.breederName}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Training For:</span> {selectedHorse.trainingFor}</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Offspring No:</span> {selectedHorse.offspringNo}</p>
                      </>
                    )}
                  </div>
                  {/* Column 2 */}
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.color} onChange={(e)=>setEditedHorse({...editedHorse, color:e.target.value})} placeholder="Color" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.breed} onChange={(e)=>setEditedHorse({...editedHorse, breed:e.target.value})} placeholder="Breed" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.trainingLevel} onChange={(e)=>setEditedHorse({...editedHorse, trainingLevel:e.target.value})} placeholder="Training Level" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.dewormingData} onChange={(e)=>setEditedHorse({...editedHorse, dewormingData:e.target.value})} placeholder="Deworming Data" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Color:</span> {selectedHorse.color} </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Breed:</span> {selectedHorse.breed} </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Training Level:</span> {selectedHorse.trainingLevel} </p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Deworming Data:</span> {selectedHorse.dewormingData} </p>
                      </>
                    )}
                  </div>
                  </div>
                  {/* Image */}
                  <div className="flex items-start justify-end pr-5">
                    <img
                      src={selectedHorse.img}
                      alt={selectedHorse.name}
                      className="h-44 rounded-lg shadow-md"
                      onError={(e) => { e.currentTarget.src = horseFallback; }}
                    />
                    {editMode && (
                      <input
                        type="file"
                        className="mt-2 w-full rounded border border-gray-300 p-1 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      />
                    )}
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
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.microchip} onChange={(e)=>setEditedHorse({...editedHorse, microchip:e.target.value})} placeholder="Microchip" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.passportNo} onChange={(e)=>setEditedHorse({...editedHorse, passportNo:e.target.value})} placeholder="Passport No" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.ownerName} onChange={(e)=>setEditedHorse({...editedHorse, ownerName:e.target.value})} placeholder="Horse Owner" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.vetName} onChange={(e)=>setEditedHorse({...editedHorse, vetName:e.target.value})} placeholder="Vet" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Microchip:</span> {selectedHorse.microchip}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Passport No:</span> {selectedHorse.passportNo}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Horse Owner:</span> {selectedHorse.ownerName}</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Vet:</span> {selectedHorse.vetName}</p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.ueln} onChange={(e)=>setEditedHorse({...editedHorse, ueln:e.target.value})} placeholder="UELN" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.passportExpiryDate} onChange={(e)=>setEditedHorse({...editedHorse, passportExpiryDate:e.target.value})} placeholder="Passport Expiry Date" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.trainerName} onChange={(e)=>setEditedHorse({...editedHorse, trainerName:e.target.value})} placeholder="Trainer" />
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
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">UELN:</span> {selectedHorse.ueln}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Passport Expiry Date:</span> {selectedHorse.passportExpiryDate}
                        </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Trainer:</span> {selectedHorse.trainerName}</p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Height:</span> {selectedHorse.heightCm} cm
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.feiNo} onChange={(e)=>setEditedHorse({...editedHorse, feiNo:e.target.value})} placeholder="FEI No" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.association} onChange={(e)=>setEditedHorse({...editedHorse, association:e.target.value})} placeholder="Association" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.riderName} onChange={(e)=>setEditedHorse({...editedHorse, riderName:e.target.value})} placeholder="Rider" />
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
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">FEI No:</span> {selectedHorse.feiNo}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Association:</span> {selectedHorse.association}</p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Rider:</span> {selectedHorse.riderName}</p>
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
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.purchasePrice} onChange={(e)=>setEditedHorse({...editedHorse, purchasePrice:e.target.value})} placeholder="Purchase Price" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.dna} onChange={(e)=>setEditedHorse({...editedHorse, dna:e.target.value})} placeholder="DNA" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Purchase Price:</span> {selectedHorse.currencyCode}</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">DNA:</span> {selectedHorse.dna}</p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <>
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.offeredPrice} onChange={(e)=>setEditedHorse({...editedHorse, offeredPrice:e.target.value})} placeholder="Offered Price" />
                        <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" value={editedHorse.comments} onChange={(e)=>setEditedHorse({...editedHorse, comments:e.target.value})} placeholder="Comments" />
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Offered Price:</span> {selectedHorse.offeredPrice} {selectedHorse.currencyCode}</p>
                        <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Comments:</span> {selectedHorse.comments}</p>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {editMode ? (
                      <input className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Sold Price" />
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Sold Price:</span> 0 AED</p>
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

      {/* --------------Add Horse Modal --------------- */}
      <HorseModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onHorseAdded={() => setRefreshKey((k) => k + 1)}
      />
      <AddModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
