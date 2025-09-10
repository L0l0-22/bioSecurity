import React, { useEffect, useState } from "react";

export default function AddModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    horse: "",
    reason: "",
    status: "",
    date: "",
    time: "",
    from: "",
    to: "",
    by: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        horse: "",
        reason: "",
        status: "",
        date: "",
        time: "",
        from: "",
        to: "",
        by: "",
      });
    }
  }, [open]);

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.horse) return;
    onSubmit(form);
    onClose();
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60"
        onClick={onClose}
      />
      {/* modal */}
      <div className="relative w-full max-h-[90vh] overflow-auto max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-main">Horse Checkpoint Information</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {["horse","reason","status","date","time","from","to","by"].map((field) => (
            <div key={field}>
              <label className="mb-1 block text-sm capitalize text-gray-600 dark:text-gray-300">
                {field}
              </label>
              <input
                type={field === "date" ? "date" : field === "time" ? "time" : "text"}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-main dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
                required={field === "horse"}
              />
            </div>
          ))}

          <div className="mt-2 flex items-center justify-end gap-3 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-main px-4 py-2 font-medium text-white hover:opacity-90"
            >
              Save CheckPoint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
