// src/components/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import { FiBell, FiChevronDown, FiChevronUp, FiSearch, FiSettings } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { MdMenu } from "react-icons/md";

export default function Header({ onToggleSidebar }) {
  const { theme, toggle } = useTheme();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // === Search state (ported from your script) ===
  const [q, setQ] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [items, setItems] = useState([]); // [{label, value}]
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchType, setSearchType] = useState(""); // 'name' | 'number'
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const onDoc = (e) => !searchRef.current?.contains(e.target) && setOpenSearch(false);
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // Build options like the vanilla function buildItems(q)
  const buildItems = useMemo(
    () => (query) => {
      if (!query) return [];
      return [
        { label: `Search Horse Name for "${query}"`, value: "name" },
        { label: `Search Check Point for "${query}"`, value: "number" },
      ];
    },
    []
  );

  // update items whenever q changes
  useEffect(() => {
    const trimmed = q.trim();
    if (!trimmed) {
      setItems([]);
      setActiveIndex(-1);
      setOpenSearch(false);
      return;
    }
    const opts = buildItems(trimmed);
    setItems(opts);
    setActiveIndex(0); // default highlight first (like your script)
    setOpenSearch(true);
  }, [q, buildItems]);

  // pick handler (like pick(i))
  const pick = (i) => {
    const li = items[i];
    if (!li) return;
    setSearchType(li.value); // 'name' or 'number'
    // keep q as typed; submit will read q + searchType
  };

  // submit handler
  const onSearch = (evt) => {
    evt?.preventDefault?.();
    if (!q.trim()) return setOpenSearch(false);
    // If no item is active (or user typed Enter directly), default to first option
    const idx = activeIndex >= 0 ? activeIndex : 0;
    pick(idx);

    // 👉 Do whatever you need here:
    // e.g., navigate(`/search?type=${searchType || items[0]?.value}&q=${encodeURIComponent(q)}`)
    console.log("Search submit:", { q, searchType: searchType || items[0]?.value });

    setOpenSearch(false);
  };

  // keyboard handling
  const onKeyDown = (e) => {
    if (!openSearch) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = Math.min((prev < 0 ? -1 : prev) + 1, items.length - 1);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max((prev < 0 ? items.length : prev) - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      // If list is open, pick current and submit
      if (items.length > 0) {
        pick(activeIndex >= 0 ? activeIndex : 0);
      }
      onSearch(e);
    } else if (e.key === "Escape") {
      setOpenSearch(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  };

  // scroll active option into view
  useEffect(() => {
    if (!listRef.current || activeIndex < 0) return;
    const node = listRef.current.children[activeIndex];
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // === User menu (unchanged) ===
  const [openUser, setOpenUser] = useState(false);
  const userRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => !userRef.current?.contains(e.target) && setOpenUser(false);
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-30 border-b border-gray-200 bg-gray-100 backdrop-blur dark:border-gray-800 dark:bg-gray-950/70">
      <div className="mx-auto flex lg:flex-row flex-col lg:items-center justify-between gap-4 p-4">
        {/* left */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center justify-between md:justify-normal w-full">
              <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden inline-flex items-center justify-center rounded-md bg-main text-white p-2 dark:bg-gray-800 dark:text-gray-100"
              aria-label="Toggle sidebar"
            >
              <MdMenu size={22} />
            </button>
            <img src={logo} alt="One Admin" className="h-20 w-auto" />
          </div>
          {/* search box */}
          <div ref={searchRef} className="relative w-full max-w-md">
            <form
              id="searchForm"
              onSubmit={onSearch}
              autoComplete="off"
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-9 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
            >
              {/* hidden like #searchType in the original script, mirrored in state */}
              <input type="hidden" id="searchType" value={searchType} readOnly />

              <input
                id="searchInput"
                ref={inputRef}
                className="w-full bg-transparent outline-none placeholder:text-gray-600 dark:text-gray-100"
                placeholder="Search For..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => q.trim() && setOpenSearch(true)}
                onKeyDown={onKeyDown}
              />
              <FiSearch className="h-8 w-8" />
            </form>

            <ul
              id="searchSuggest"
              ref={listRef}
              role="listbox"
              className={`absolute left-0 right-0 mt-2 max-h-56 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 ${
                openSearch && items.length > 0 ? "block" : "hidden"
              }`}
            >
              {items.map((it, i) => (
                <li
                  key={i}
                  role="option"
                  aria-selected={i === activeIndex ? "true" : "false"}
                  data-value={it.value}
                  // Use onMouseDown so it fires before the input loses focus
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActiveIndex(i);
                    pick(i);
                    onSearch(); // submit form
                  }}
                  className={`cursor-pointer px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    i === activeIndex ? "bg-gray-50 dark:bg-gray-800" : ""
                  }`}
                >
                  {it.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* right */}
        <div className="flex justify-center md:justify-end items-center gap-3">
          <NavLink
            to="/settings"
            className="inline-flex bg-main text-white hover:bg-sec h-10 w-10 items-center justify-center rounded-full border border-gray-200 
              dark:border-gray-700 dark:bg-gray-800"
          >
            <FiSettings className="h-5 w-5" />
          </NavLink>

          <NavLink
            to="/alerts"
            className="inline-flex bg-main text-white hover:bg-sec h-10 w-10 items-center justify-center rounded-full border border-gray-200 
              dark:border-gray-700 dark:bg-gray-800"
          >
            <FiBell className="h-5 w-5" />
          </NavLink>

          {/* theme toggle */}
          <button
            aria-label={`Toggle ${theme === "light" ? "Dark" : "Light"} Mode`}
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-main text-white text-xl hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>

          {/* user menu */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setOpenUser((v) => !v)}
              className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
            >
              <FaRegUser className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              <div className="text-left leading-tight">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Ahmed Salah</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dubai, UAE</p>
              </div>
              {openUser ? (
                <FiChevronUp className="text-gray-500" />
              ) : (
                <FiChevronDown className="text-gray-500" />
              )}
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-1 shadow-xl dark:border-gray-700 dark:bg-gray-900 ${
                openUser ? "block" : "hidden"
              }`}
            >
              <Link to="/profile" className="block px-3 py-2 text-sm hover:bg-purple-50 dark:hover:bg-gray-800">
                View Profile
              </Link>
              <Link to="/settings" className="block px-3 py-2 text-sm hover:bg-purple-50 dark:hover:bg-gray-800">
                Setting
              </Link>
              <Link className="block px-3 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-600">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
