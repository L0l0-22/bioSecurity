import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useTheme } from "../../theme/ThemeContext"; // <- adjust path if needed

const COLORS = { in: "#6952B6", out: "#08D0E6" };

export default function HorsesCheckPoints() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Chart palette based on theme
  const gridColor = isDark ? "#374151" : "#e5e7eb";   // gray-700 / gray-200
  const tickColor = isDark ? "#d1d5db" : "#9ca3af";  // gray-300 / gray-400
  const cursorFill = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const tooltipBg = isDark ? "#111827" : "#ffffff";  // gray-900 / white
  const tooltipBorder = isDark ? "#374151" : "#e5e7eb";
  const tooltipText = isDark ? "#e5e7eb" : "#111827";

  const [range, setRange] = useState("YEAR");
  const DATA = useMemo(
    () => ({
      YEAR: [
        { m: "JAN", checkIn: 100, checkOut: 450 },
        { m: "FEB", checkIn: 350, checkOut: 150 },
        { m: "MAR", checkIn: 300, checkOut: 180 },
        { m: "APR", checkIn: 250, checkOut: 300 },
        { m: "MAY", checkIn: 30,  checkOut: 400 },
        { m: "JUN", checkIn: 150, checkOut: 30 },
        { m: "JUL", checkIn: 50,  checkOut: 290 },
      ],
      MONTH: [
        { m: "W1", checkIn: 90,  checkOut: 120 },
        { m: "W2", checkIn: 130, checkOut: 80 },
        { m: "W3", checkIn: 70,  checkOut: 140 },
        { m: "W4", checkIn: 110, checkOut: 100 },
      ],
      WEEK: [
        { m: "MON", checkIn: 30, checkOut: 60 },
        { m: "TUE", checkIn: 45, checkOut: 20 },
        { m: "WED", checkIn: 25, checkOut: 55 },
        { m: "THU", checkIn: 50, checkOut: 35 },
        { m: "FRI", checkIn: 10, checkOut: 40 },
        { m: "SAT", checkIn: 15, checkOut: 25 },
        { m: "SUN", checkIn: 20, checkOut: 30 },
      ],
    }),
    []
  );

  const data = DATA[range];

  return (
    <div className="w-full lg:w-[50%] rounded-2xl border border-gray-200 bg-[#f7f7f8] p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Horses Check Points
        </h3>

        {/* Segmented control */}
        <div className="flex items-center gap-2">
          {["WEEK", "MONTH", "YEAR"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={[
                "rounded-full border px-4 py-1 text-sm transition",
                range === r
                  ? "bg-main text-white border-main dark:border-main"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-main hover:text-white dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              ].join(" ")}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-2 flex justify-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-8" style={{ background: COLORS.in }} />
          <span className="text-gray-700 dark:text-gray-300">Check in</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-8" style={{ background: COLORS.out }} />
          <span className="text-gray-700 dark:text-gray-300">Check out</span>
        </div>
      </div>

      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={20}>
            <CartesianGrid stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="m"
              tick={{ fill: tickColor, fontSize: 12 }}
              tickMargin={10}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
            />
            <YAxis
              tick={{ fill: tickColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
              tickLine={{ stroke: gridColor }}
              domain={[0, "dataMax + 50"]}
              tickCount={6}
            />
            <Tooltip
              cursor={{ fill: cursorFill }}
              contentStyle={{
                borderRadius: 10,
                border: `1px solid ${tooltipBorder}`,
                backgroundColor: tooltipBg,
                color: tooltipText,
              }}
            />
            <Bar dataKey="checkIn" name="Check in" fill={COLORS.in} maxBarSize={40} />
            <Bar dataKey="checkOut" name="Check out" fill={COLORS.out} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
