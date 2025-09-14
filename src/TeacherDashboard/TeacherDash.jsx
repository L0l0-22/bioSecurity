import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import icon1 from "../assets/images/icon/business.png";
import icon2 from "../assets/images/icon/horse2.png";
import icon3 from "../assets/images/icon/flag2.png";
import icon4 from "../assets/images/icon/notification (Copy).png";
import icon5 from "../assets/images/icon/settings.png";
import Header from '../components/Header';

export default function TeacherDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to /dashboard when landing on the parent route (e.g., after refresh)
  useEffect(() => {
    // Adjust these to your actual parent path(s)
    const parentPaths = ['/', '/teacher'];
    if (parentPaths.includes(location.pathname)) {
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, navigate]);

  const items = [
    { label: 'Dashboard', to: '/dashboard', icon: icon1 },
    { label: 'Horse Details', to: '/horse', icon: icon2 },
    { label: 'Check Point', to: '/checkpoint', icon: icon3 },
    { label: 'Alerts Summary', to: '/alerts', icon: icon4, badge: 3 },
    { label: 'Setting', to: '/settings', icon: icon5 },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <div>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 min-h-screen h-full w-56 lg:w-32 pt-20 lg:pt-32 overflow-y-auto
          bg-gray-100 border-r border-gray-200
          dark:bg-gray-900 dark:border-gray-800
          flex flex-col items-center py-6 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden rounded-md text-xl py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <ul className="flex-1 flex flex-col items-center font-medium w-full text-gray-600 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.to} className="w-full">
              <NavLink
                to={item.to}
                end={item.to === '/dashboard'} // exact match for the dashboard tab
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

      {/* Main content renders the nested route */}
      <main className="flex-1 min-w-0 pb-8 md:px-8 pt-4 mt-64 lg:mt-28 lg:ml-32">
        <Outlet />
      </main>
    </div>
  );
}
