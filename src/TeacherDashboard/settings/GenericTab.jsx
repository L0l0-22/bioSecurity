import React, { useState, useEffect } from 'react';
import GenericModal from './GenericModal';

const GenericTab = ({ config }) => {
  const {
    title,
    fields,
    initialData = [],
    searchFields = ['name'],
    modalTitle = `New ${title}`,
    modalFields = fields
  } = config;

  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0]);
    }
  }, [items, selectedItem]);

  const openCreateModal = () => setIsModalOpen(true);
  const handleSaveItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
    setSelectedItem(newItem);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const switchToEdit = () => setIsEditMode(true);
  const switchToView = () => setIsEditMode(false);
  const saveItem = () => {
    console.log(`Saving ${title.toLowerCase()}...`);
    setIsEditMode(false);
  };

  const selectItem = (id) => {
    const item = items.find(x => x.id === id);
    if (item) setSelectedItem(item);
  };

  const filteredItems = items.filter(item =>
    searchFields.some(field =>
      item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="dark:bg-gray-950 dark:text-gray-100">
      {/* Add New Button */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          className="bg-main px-4 font-medium py-1 text-lg text-white rounded-md hover:opacity-90"
          onClick={openCreateModal}
        >
          Add New
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: List */}
        <aside className="lg:w-1/3 border rounded-lg p-4 dark:border-gray-700 dark:bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            <span className="bg-main text-white px-2 py-1 rounded-full text-sm">
              {filteredItems.length}
            </span>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  selectedItem?.id === item.id
                    ? 'bg-purple-50 border border-main dark:bg-purple-900/20'
                    : 'bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
                onClick={() => selectItem(item.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-800 dark:text-gray-100">
                    {item.name || item.title || item.id}
                  </div>
                  {item.count !== undefined && (
                    <span className="bg-purple-100 text-main px-2 py-1 rounded-full text-xs font-semibold dark:bg-purple-900/30 dark:text-purple-300">
                      {item.count}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No {title.toLowerCase()} found
              </p>
            )}
          </div>
        </aside>

        {/* RIGHT: Details */}
        {!isEditMode ? (
          <div className="lg:w-2/3">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {selectedItem ? selectedItem.name || selectedItem.title : title}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="bg-main px-4 font-medium py-1 text-lg text-white rounded-md hover:opacity-90"
                    onClick={switchToEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <button className="w-full text-left py-3 px-4 bg-gray-200 border border-gray-300 rounded-t-md font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                {title}
              </button>
              <div className="border border-t-0 border-gray-300 rounded-b-md p-4 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                <div className="grid grid-cols-1 gap-3">
                  {fields.map((field) => (
                    <p key={field.name} className="text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">{field.label}:</span>{' '}
                      <span>{selectedItem?.[field.name] || '—'}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-main px-4 font-medium py-1 text-lg text-white rounded-md hover:opacity-90"
                  onClick={switchToView}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  onClick={saveItem}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="p-4">
              <button className="w-full text-left py-3 px-4 bg-gray-200 border border-gray-300 rounded-t-md font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                {title}
              </button>
              <div className="border border-t-0 border-gray-300 rounded-b-md p-4 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                <div className="grid grid-cols-1 gap-4">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {field.label}
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                        type={field.type || 'text'}
                        defaultValue={selectedItem?.[field.name] || ''}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <GenericModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveItem}
        items={items}
        title={modalTitle}
        fields={modalFields}
      />
    </div>
  );
};

export default GenericTab;
