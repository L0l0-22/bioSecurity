import React from "react";

export default function Table({ rows = [] }) {
  const fmtDate = (iso) => {
    if (!iso) return "";
    if (iso.includes("-") && iso.split("-")[0].length === 4) {
      try {
        const d = new Date(iso);
        if (isNaN(d.getTime())) return iso;
        return d
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, "-");
      } catch {
        return iso;
      }
    }
    return iso;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-[#f7f7f8] p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Horses Movements
      </h3>

      <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl ring-1 ring-main dark:ring-gray-700">
        <table
          className="w-full text-sm !border-separate whitespace-nowrap dark:text-gray-300"
          style={{ borderCollapse: "separate", borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {[
                "Horse Name",
                "Reason",
                "Status",
                "Date",
                "Time",
                "Move From",
                "Move To",
                "Move By",
              ].map((h) => (
                <th
                  key={h}
                  className="border-white px-4 py-3 text-left font-semibold whitespace-nowrap !border-l first:!border-l-0 dark:border-gray-900"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => {
              const rowClass =
                i % 2
                  ? "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  : "bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-300";
              const cellBorderClass =
                i % 2
                  ? "border-white dark:border-gray-900"
                  : "border-gray-200 dark:border-gray-800";

              return (
                <tr key={i} className={rowClass}>
                  {[
                    r.horse,
                    r.reason,
                    r.status,
                    fmtDate(r.date),
                    r.time,
                    r.from,
                    r.to,
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {r.by}
                    </span>,
                  ].map((val, idx) => (
                    <td
                      key={idx}
                      className={`border-t border-l first:border-l-0 px-4 py-3 whitespace-nowrap ${cellBorderClass}`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr className="bg-white text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                <td className="px-4 py-6 text-center text-gray-500 dark:text-gray-400" colSpan={8}>
                  No rows yet — click <b className="text-gray-800 dark:text-gray-100">Add Check Point</b> to insert one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
