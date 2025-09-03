import React from 'react';
import GenericTab from './GenericTab';

const TransportTypes = () => {
  const config = {
    title: 'Transport Types',
    fields: [
      { name: 'type', label: 'Vehicle Type', type: 'text', required: true },
      { name: 'plate', label: 'Vehicle Plate', type: 'text' },
      { name: 'capacity', label: 'Capacity', type: 'text' }
    ],
    initialData: [
      { id: 1, type: "Horse Trailer", plate: "TRL-001", capacity: "6 horses", count: 2 },
      { id: 2, type: "Van", plate: "VAN-001", capacity: "2 horses", count: 4 }
    ],
    searchFields: ['type', 'plate'],
    modalTitle: 'New Transport Type',
    modalFields: [
      { name: 'type', label: 'Vehicle Type', type: 'text', required: true, placeholder: 'Vehicle Type' },
      { name: 'plate', label: 'Vehicle Plate', type: 'text', placeholder: 'Vehicle Plate' },
      { name: 'capacity', label: 'Capacity', type: 'text', placeholder: 'Vehicle Capacity' }
    ]
  };

  return <GenericTab config={config} />;
};

export default TransportTypes;




