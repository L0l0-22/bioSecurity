
import React from 'react';
import GenericTab from './GenericTab';

const Checkpoint = () => {
  const config = {
    title: 'Checkpoints',
    fields: [
      { name: 'name', label: 'Check Point Name', type: 'text', required: true },
      { name: 'number', label: 'Check Point Number', type: 'text' },
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'area', label: 'Area', type: 'text' },
      { name: 'desc', label: 'Description', type: 'text' }
    ],
    initialData: [
      { id: 1, name: "Gate A", number: "CP-001", address: "North Entrance", area: "Zone 1", desc: "Main gate", count: 3 },
      { id: 2, name: "Gate B", number: "CP-002", address: "South Entrance", area: "Zone 3", desc: "Secondary gate", count: 5 },
      { id: 3, name: "Vet Check", number: "CP-003", address: "Clinic Hall", area: "Zone 2", desc: "Vet checkpoint", count: 2 },
    ],
    searchFields: ['name', 'number'],
    modalTitle: 'New Checkpoint',
    modalFields: [
      { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Checkpoint Name' },
      { name: 'number', label: 'Number', type: 'text', placeholder: 'Checkpoint Number' },
      { name: 'address', label: 'Address', type: 'text', placeholder: 'Checkpoint Address' },
      { name: 'area', label: 'Area', type: 'text', placeholder: 'Checkpoint Area' },
      { name: 'desc', label: 'Description', type: 'text', placeholder: 'Checkpoint Description' },
    ]
  };

  return <GenericTab config={config} />;
};

export default Checkpoint;