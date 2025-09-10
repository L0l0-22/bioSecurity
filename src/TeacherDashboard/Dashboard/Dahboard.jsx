/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import horseIcon from "../../assets/images/icon/horse-head.png";
import arenaIcon from "../../assets/images/icon/stadium.png";
import stableIcon from "../../assets/images/icon/stable.png";
import flagIcon from "../../assets/images/icon/flag.png";
import HorsesCheckPoints from './HorsesCheckPoints';
import FacilitySummary from './FacilitySummary';
import Table from './Table';

export default function Dashboard() {
  const stats = [
    { label: "HORSES",       value: 38, icon: horseIcon },
    { label: "ARENAS",       value: 59, icon: arenaIcon },
    { label: "STABLES",      value: 87, icon: stableIcon },
    { label: "CHECK POINTS", value: 43, icon: flagIcon },
  ];

  const initialRows = useMemo(
    () => [
      { horse: "Horse 1", reason: "Deceased", status: "Dead", date: "14-Jan-2024", time: "16:28", from: "inside",  to: "outside", by: "Ride" },
      { horse: "Horse 2", reason: "Deceased", status: "Dead", date: "13-Jan-2024", time: "14:12", from: "inside",  to: "outside", by: "Walk" },
      { horse: "Horse 3", reason: "Deceased", status: "Dead", date: "12-Jan-2024", time: "10:00", from: "outside", to: "stable",  by: "Truck" },
      { horse: "Horse 4", reason: "Deceased", status: "Dead", date: "15-Jan-2024", time: "08:45", from: "barn",    to: "yard",    by: "Walk" },
      { horse: "Horse 5", reason: "Deceased", status: "Dead", date: "14-Jan-2024", time: "16:28", from: "inside",  to: "outside", by: "Ride" },
      { horse: "Horse 6", reason: "Deceased", status: "Dead", date: "11-Jan-2024", time: "12:50", from: "yard",    to: "clinic",  by: "Ride" },
      { horse: "Horse 7", reason: "Deceased", status: "Dead", date: "13-Jan-2024", time: "18:30", from: "pasture", to: "barn",    by: "Trailer" },
      { horse: "Horse 8", reason: "Deceased", status: "Dead", date: "10-Jan-2024", time: "09:10", from: "stable",  to: "outside", by: "Walk" },
      { horse: "Horse 9", reason: "Deceased", status: "Dead", date: "09-Jan-2024", time: "07:40", from: "barn",    to: "yard",    by: "Truck" },
      { horse: "Horse 10",reason: "Deceased", status: "Dead", date: "14-Jan-2024", time: "16:28", from: "inside",  to: "outside", by: "Ride" },
    ],
    []
  );

  return (
    <div className="space-y-5 text-gray-900 dark:text-gray-100 px-5 lg:px-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5 mx-2 w-full">
        {stats.map((item, i) => (
          <div
            key={i}
            className="relative flex overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-lg
                       dark:border-gray-800 dark:bg-gray-900"
          >
            {/* left block with icon */}
            <div className="flex w-24 items-center justify-center bg-gray-300/50 dark:bg-gray-700/50">
              <img src={item.icon} alt={item.label} className="object-cover p-3 dark:opacity-90" />
            </div>

            {/* value + label */}
            <div className="flex flex-1 items-center gap-3 px-4">
              <p className="text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap gap-y-5 justify-around">
        <FacilitySummary />
        <HorsesCheckPoints />
      </div>
      <Table rows={initialRows} />
    </div>
  );
}
