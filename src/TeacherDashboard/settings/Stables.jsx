import React from 'react';
import GenericTab from './GenericTab';

const Stables = () => {
  const config = {
    title: 'Stables',
    fields: [
      { name: 'name', label: 'Stable Name', type: 'text', required: true },
      { name: 'number', label: 'Stable Number', type: 'text' },
      { name: 'capacity', label: 'Capacity', type: 'text' }
    ],
    initialData: [
      { id: 1, name: "Main Stable", number: "STB-001", capacity: "20 horses", count: 15 },
      { id: 2, name: "West Stable", number: "STB-002", capacity: "12 horses", count: 8 }
    ],
    searchFields: ['name', 'number'],
    modalTitle: 'New Stable',
    modalFields: [
      { name: 'name', label: 'Stable Name', type: 'text', required: true, placeholder: 'Stable Name'},
      { name: 'number', label: 'Stable Number', type: 'text', placeholder: 'Stable Number' },
      { name: 'capacity', label: 'Capacity', type: 'text', placeholder: 'Stable Capacity' }
    ]
  };

  return <GenericTab config={config} />;
};

export default Stables;
