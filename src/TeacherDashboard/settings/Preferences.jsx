import React, { useState } from 'react';

const Preferences = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const switchToEditSetting = () => setIsEditMode(true);
  const switchToViewSetting = () => setIsEditMode(false);

  const saveHorse = () => {
    console.log('Saving preferences...');
    setIsEditMode(false);
  };

  return (
    <div className="bg-white dark:bg-gray-950 dark:text-gray-100">
      {!isEditMode ? (
        // View Mode
        <div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Preferences</h2>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="bg-main px-4 font-medium py-1 text-lg items-center text-white rounded-md hover:opacity-90"
                  onClick={switchToEditSetting}
                >
                  Edit
                </button>
              </div>
            </div>
            
            <button className="w-full text-left py-3 px-4 bg-gray-200 border border-gray-300 rounded-t-md font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              Preferences
            </button>
            <div className="border border-t-0 border-gray-300 rounded-b-md p-4 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Units:</span> ----</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Currency:</span> ----</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Language:</span> ----</p>
                <p className="text-gray-700 dark:text-gray-300"><span className="font-semibold">Time Zone:</span> ----</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Edit Mode
        <div>
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Setting</h2>
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-4 py-2 bg-main text-white rounded-md hover:opacity-90 transition-colors"
                onClick={switchToViewSetting}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={saveHorse}
              >
                Save
              </button>
            </div>
          </div>

          <div className="p-4">
            <button className="w-full text-left py-3 px-4 bg-gray-100 border border-gray-300 rounded-t-md font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              Preferences
            </button>
            <div className="border border-t-0 border-gray-300 rounded-b-md p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Units</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    type="text" 
                    defaultValue="----" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    type="text" 
                    defaultValue="----" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    type="text" 
                    defaultValue="----" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Zone</label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    type="text" 
                    defaultValue="----" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
