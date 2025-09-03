import React from 'react';
import GenericTab from './GenericTab';

const Bubbles = () => {
  const config = {
    title: 'Bubbles',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'number', label: 'Number', type: 'text' },
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'area', label: 'Area', type: 'text' },
      { name: 'desc', label: 'Description', type: 'text' }
    ],
    initialData: [
      { id: 1, name: "Training Bubble A", number: "BUB-001", address: "East Wing", area: "Zone 1", desc: "Main training area", count: 5 },
      { id: 2, name: "Training Bubble B", number: "BUB-002", address: "West Wing", area: "Zone 2", desc: "Secondary training area", count: 3 }
    ],
    searchFields: ['name', 'number'],
    modalTitle: 'New Bubble',
    modalFields: [
      { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Training Bubble' },
      { name: 'number', label: 'Number', type: 'text', placeholder: 'Bubble Number' },
      { name: 'address', label: 'Address', type: 'text', placeholder: 'Bubble Address' },
      { name: 'area', label: 'Area', type: 'text', placeholder: 'Bubble Area' },
      { name: 'desc', label: 'Description', type: 'text', placeholder: 'Bubble Description' }
    ]
  };

  return <GenericTab config={config} />;
};

export default Bubbles;
