import React from 'react';
import GenericTab from './GenericTab';

const Arenas = () => {
  const config = {
    title: 'Arenas',
    fields: [
      { name: 'name', label: 'Arena Name', type: 'text', required: true },
      { name: 'number', label: 'Arena Number', type: 'text' },
      { name: 'capacity', label: 'Capacity', type: 'text' }
    ],
    initialData: [
      { id: 1, name: "Main Arena", number: "ARN-001", capacity: "100 spectators", count: 12 },
      { id: 2, name: "Training Arena", number: "ARN-002", capacity: "50 spectators", count: 8 }
    ],
    searchFields: ['name', 'number'],
    modalTitle: 'New Arena',
    modalFields: [
      { name: 'name', label: 'Arena Name', type: 'text', required: true, placeholder: 'Arena Name' },
      { name: 'number', label: 'Arena Number', type: 'text', placeholder: 'Arena Number' },
      { name: 'capacity', label: 'Capacity', type: 'text', placeholder: 'Arena Capacity' }
    ]
  };

  return <GenericTab config={config} />;
};

export default Arenas;
