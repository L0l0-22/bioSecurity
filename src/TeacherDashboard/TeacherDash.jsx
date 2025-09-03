import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';

import icon1 from "../assets/images/icon/business.png";
import icon2 from "../assets/images/icon/horse2.png";
import icon3 from "../assets/images/icon/flag2.png";
import icon4 from "../assets/images/icon/notification (Copy).png";
import icon5 from "../assets/images/icon/settings.png";
import Header from '../components/Header';

export default function TeacherDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const items = [
    { label: 'Dashboard', to: '/dashboard', icon: icon1 },
    { label: 'Horse Details', to: '/horse', icon: icon2 },
    { label: 'Check Point', to: '/checkpoint', icon: icon3 },
    { label: 'Alerts Summary', to: '/alerts', icon: icon4, badge: 3 },
    { label: 'Setting', to: '/settings', icon: icon5 },
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-32 pt-32
          bg-gray-100 border-r border-gray-200
          dark:bg-gray-900 dark:border-gray-800
          flex flex-col items-center py-6 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <ul className="flex-1 flex flex-col items-center font-medium w-full text-gray-600 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.to} className="w-full">
              <NavLink
                to={item.to}
                onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                className={({ isActive }) =>
                  [
                    "relative flex flex-col items-center gap-1 cursor-pointer px-4 py-6 w-full text-center transition-colors",
                    isActive
                      ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      : "hover:bg-gray-200 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-300"
                  ].join(" ")
                }
              >
                <div className="relative flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="object-contain dark:opacity-90"
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-5 h-6 w-6 rounded-full bg-sec text-white text-sm flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="mt-2 text-xs">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-[3.25rem] left-4 z-50 lg:hidden bg-main text-white p-2 rounded-md dark:bg-gray-800 dark:text-gray-100"
        aria-label="Toggle sidebar"
      >
        <MdMenu size={24} />
      </button>

      {/* Main content renders the nested route */}
      <main className="flex-1 pb-8 px-8 pt-4 mt-28 lg:ml-32">
        <Outlet />
      </main>
    </div>
  );
}
