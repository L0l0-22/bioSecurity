import React, { useState } from 'react';

const GenericModal = ({ isOpen, onClose, onSave, items, title, fields }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newItem = {
      id: Math.max(0, ...items.map(item => item.id)) + 1,
      ...formData,
      count: 0,
    };
    onSave(newItem);
    handleClose();
  };

  const handleClose = () => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-xl w-full max-w-7xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-main">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder || field.label}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${errors[field.name] ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
                    dark:bg-gray-950 dark:text-gray-100`}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400
                         dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-main px-4 font-medium py-1 text-lg text-white rounded-md hover:opacity-90"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;
