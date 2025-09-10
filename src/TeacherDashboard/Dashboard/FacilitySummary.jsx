import React from "react";
import stableIcon from "../../assets/images/icon/stable.png";
import arenaIcon from "../../assets/images/icon/stadium.png";

export default function FacilitySummary() {
  const items = [
    { title: "Stable", count: 15, icon: stableIcon },
    { title: "Arena",  count: 20, icon: arenaIcon },
  ];

  return (
    <div className="w-full lg:w-[48%] rounded-2xl border border-gray-200 bg-[#f7f7f8] p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {items.map((it, i) => (
          <div
            key={i}
            className="md:mt-20 w-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="mb-3 text-xl font-normal text-gray-800 dark:text-gray-200">
              {it.title}
            </p>

            <div className="mb-5 flex justify-center">
              <img
                src={it.icon}
                alt={it.title}
                className="h-16 w-16 object-contain dark:opacity-90"
              />
            </div>

            <p className="text-4xl font-normal text-gray-900 dark:text-gray-100">
              {it.count} <span className="font-normal text-gray-600 dark:text-gray-400">Horses</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
