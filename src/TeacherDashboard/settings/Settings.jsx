import React, { useState } from 'react';
import Preferences from './Preferences';
import Checkpoint from './Checkpoint';
import Bubbles from './Bubbles';
import TransportTypes from './TransportTypes';
import Stables from './Stables';
import Arenas from './Arenas';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Preferences');

  const tabs = [
    { id: 'Preferences', label: 'Preferences', component: <Preferences /> },
    { id: 'Checkpoint', label: 'Checkpoint', component: <Checkpoint /> },
    { id: 'Bubbles', label: 'Bubbles', component: <Bubbles /> },
    { id: 'TransportTypes', label: 'Transport Types', component: <TransportTypes /> },
    { id: 'Stables', label: 'Stables', component: <Stables /> },
    { id: 'Arenas', label: 'Arenas', component: <Arenas /> },
  ];

  const activeTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-white px-3 py-4 md:p-6 dark:bg-gray-950 dark:text-gray-100">
      <div className="min-w-0">
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-950">
          {/* Tabs Row */}
          <div className="border-b border-gray-200 px-3 md:px-6 flex items-center justify-start md:justify-center dark:border-gray-700">
            {/* Navigation Tabs (scroll on mobile) */}
            <nav className="flex w-full md:w-auto gap-4 md:gap-8 -mb-px overflow-x-auto whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 py-3 md:py-4 px-3 md:px-1 font-semibold text-sm md:text-lg border-b-2 transition-colors duration-200
                    ${
                      activeTab === tab.id
                        ? 'border-sec text-sec'
                        : 'border-transparent text-gray-500 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-3 md:p-6 min-w-0">
            {activeTabComponent || <div>Select a tab</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
