import React, { useEffect, useMemo, useRef, useState } from "react";
import profile2 from "../../assets/images/horses/profile.jpg";
import axios from "axios";
import Loader from "../../components/Loader";

export default function Profile() {
  const [mode, setMode] = useState("view");
  const auth = JSON.parse(sessionStorage.getItem("authToken"));
  const token = auth?.token;
  const id = auth?.id;
  const API_BASE = "https://bioapis.gosmart.eg/api";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //show data 
  useEffect(() => {
  const fetchProfile = async () => {
    console.log("[profileSection] Fetching profile...");
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const profile = res.data.profile;
      setForm({
        fullName: profile.name ?? "—",
        email: profile.email ?? "—",
        mobile: profile.phone ?? "—",
        whatsapp: profile.whatsapp_number ?? "—",
        passportNo: profile.passport_no ?? "—",
        passportExpiry: profile.passport_expiry_date ?? "—",
        idNo: profile.id ?? "—",
        idExpiry: profile.id_expiry_date ?? "—",
        profession: profile.function ?? "—",
        company: profile.company ?? "—",
        country: profile.address?.country ?? "—",
        address: [
          profile.address?.street,
          profile.address?.street2,
          profile.address?.city,
          profile.address?.zip,
          profile.address?.state,
        ]
          .filter(Boolean) // remove null/undefined/empty
          .join(" , ") || "—", // combine into one string
        equinaPoints: profile.equina_points ?? "—",
        userType: "Administrator", // maybe hardcoded or from API later
        photoUrl: profile2,        // or a profile image field if backend sends it
        tel: "—", // not provided
        taxNo: "—", // not provided
      });
      console.log("[profileSection]" , res);
    } catch (err) {
      console.error("[profileSection] Fetch error:", err);
      setError(err.message || "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
  }, [API_BASE , id, token]);
  
  const initial = useMemo(
    () => ({
      fullName: "Ahmed Salah",
      role: "Administrator",
      email: "----",
      mobile: "----",
      company: "----",
      country: "----",
      address: "----",
      profession: "----",
      tel: "----",
      taxNo: "----",
      passportNo: "----",
      passportExpiry: "----",
      whatsapp: "----",
      idNo: "----",
      idExpiry: "----",
      equinaPoints: "----",
      userType: "Administrator",
      photoUrl: profile2,
    }),
    []
  );

  const [form, setForm] = useState(initial);
  const [preview, setPreview] = useState(initial.photoUrl);
  const fileRef = useRef(null);

  const onEdit = () => setMode("edit");
  const onCancel = () => {
    setForm(initial);
    setPreview(initial.photoUrl);
    if (fileRef.current) fileRef.current.value = "";
    setMode("view");
  };
  const onSave = () => setMode("view");
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const onPickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result || "");
    reader.readAsDataURL(file);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500 dark:text-red-400 bg-red-100 w-full text-center font-medium py-3 text-lg">{error}</p>;
  }

  return (
    <section className="w-full dark:bg-gray-950 dark:text-gray-100">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 px-4 pt-4">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight">{form.fullName}</h1>
          <p className="text-lg text-main -mt-1 dark:text-gray-300">{form.role}</p>
        </div>
        {mode === "view" ? (
          <button
            onClick={onEdit}
            className="h-10 rounded-lg bg-main px-4 text-white hover:opacity-90"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="h-10 rounded-lg bg-gray-200 px-4 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="h-10 rounded-lg bg-main px-4 text-white hover:opacity-90"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* ===== VIEW MODE ===== */}
      {mode === "view" && (
        <div className="px-4 pb-6">
          {/* Personal info */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-t-xl bg-gray-100 px-4 py-3 font-semibold dark:bg-gray-800">
              Personal info
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              {/* Left (two columns of labels) */}
              <div className="md:col-span-2 grid grid-cols-1 gap-y-6 md:grid-cols-2">
                <div className="space-y-6">
                  <p>Full Name: {form.fullName}</p>
                  <p>Mobile Number: {form.mobile}</p>
                  <p>Country: {form.country}</p>
                  <p>Profession: {form.profession}</p>
                  <p>Tax No: {form.taxNo}</p>
                </div>
                <div className="space-y-6">
                  <p>Email: {form.email}</p>
                  <p>Company: {form.company}</p>
                  <p>Address: {form.address}</p>
                  <p>Tel: {form.tel}</p>
                </div>
              </div>

              {/* Photo on the right */}
              <div className="flex items-start justify-end">
                <img
                  src={preview}
                  alt="Profile"
                  className="h-44 w-44 rounded-xl border border-gray-200 object-cover dark:border-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-t-xl bg-gray-100 px-4 py-3 font-semibold dark:bg-gray-800">
              Details
            </div>
            <div className="grid grid-cols-1 gap-y-6 p-4 md:grid-cols-3">
              <div className="space-y-6">
                <p>Passport No: {form.passportNo}</p>
                <p>ID No: {form.idNo}</p>
              </div>
              <div className="space-y-6">
                <p>Passport Expiry Date: {form.passportExpiry}</p>
                <p>ID Expiry Date: {form.idExpiry}</p>
              </div>
              <div className="space-y-6">
                <p>WHATSAPP number: {form.whatsapp}</p>
                <p>Total Equina Points: {form.equinaPoints}</p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-t-xl bg-gray-100 px-4 py-3 font-semibold dark:bg-gray-800">
              Account Info
            </div>
            <div className="p-4">
              <p>User Type: {form.userType}</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODE ===== */}
      {mode === "edit" && (
        <div className="px-4 pb-6">
          {/* Personal info (edit) */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-t-xl bg-gray-100 px-4 py-3 font-semibold dark:bg-gray-800">
              Personal info
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              {/* Fields */}
              <div className="md:col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Column A */}
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Full Name</span>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Email</span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Mobile Number</span>
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Company</span>
                  <input
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Country</span>
                  <input
                    name="country"
                    value={form.country}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Address</span>
                  <input
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Profession</span>
                  <input
                    name="profession"
                    value={form.profession}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Tel</span>
                  <input
                    name="tel"
                    value={form.tel}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Tax No</span>
                  <input
                    name="taxNo"
                    value={form.taxNo}
                    onChange={onChange}
                    className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                </label>
              </div>

              {/* Photo */}
              <div>
                <span className="mb-1 block text-sm font-medium">Personal Photo</span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="block w-full rounded-lg border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  onChange={onPickPhoto}
                />
                {preview && (
                  <div className="mt-2 flex justify-end">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-44 w-44 rounded-xl border border-gray-200 object-cover dark:border-gray-700"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details (edit) */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-t-xl bg-gray-100 px-4 py-3 font-semibold dark:bg-gray-800">
              Details
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Passport No</span>
                <input
                  name="passportNo"
                  value={form.passportNo}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Passport Expiry Date</span>
                <input
                  type="date"
                  name="passportExpiry"
                  value={form.passportExpiry === "----" ? "" : form.passportExpiry}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:[color-scheme:dark] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">WHATSAPP number</span>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">ID No</span>
                <input
                  name="idNo"
                  value={form.idNo}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">ID Expiry Date</span>
                <input
                  type="date"
                  name="idExpiry"
                  value={form.idExpiry === "----" ? "" : form.idExpiry}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:[color-scheme:dark] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Total Equina Points</span>
                <input
                  name="equinaPoints"
                  value={form.equinaPoints}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
            </div>
          </div>

          {/* Account Info (edit) */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="rounded-t-xl bg-gray-100 px-4 py-3 font-semibold dark:bg-gray-800">
              Account Info
            </div>
            <div className="p-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">User Type</span>
                <input
                  name="userType"
                  value={form.userType}
                  onChange={onChange}
                  className="w-full bg-transparent outline-none placeholder:text-gray-600 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
