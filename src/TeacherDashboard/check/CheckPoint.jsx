import React, { useMemo, useState } from 'react'
import Table from '../Dashboard/Table'
import { IoMdAdd } from 'react-icons/io'
import AddModal from './AddModal';

export default function CheckPoint() {
    // initial sample rows , useMemo used to ensure that the initial array isn’t re-created every render
    const initialRows = useMemo(
        () => [
            { horse: "Horse 1", reason: "Deceased", status: "Dead", date: "14-Jan-2024", time: "16:28", from: "inside",  to: "outside", by: "Ride"   },
            { horse: "Horse 2", reason: "Deceased", status: "Dead", date: "13-Jan-2024", time: "14:12", from: "inside",  to: "outside", by: "Walk"   },
            { horse: "Horse 3", reason: "Deceased", status: "Dead", date: "12-Jan-2024", time: "10:00", from: "outside", to: "stable",  by: "Truck"  },
            { horse: "Horse 4", reason: "Deceased", status: "Dead", date: "15-Jan-2024", time: "08:45", from: "barn",    to: "yard",    by: "Walk"   },
            { horse: "Horse 5", reason: "Deceased", status: "Dead", date: "14-Jan-2024", time: "16:28", from: "inside",  to: "outside", by: "Ride"   },
            { horse: "Horse 6", reason: "Deceased", status: "Dead", date: "11-Jan-2024", time: "12:50", from: "yard",    to: "clinic",  by: "Ride"   },
            { horse: "Horse 7", reason: "Deceased", status: "Dead", date: "13-Jan-2024", time: "18:30", from: "pasture", to: "barn",    by: "Trailer"},
            { horse: "Horse 8", reason: "Deceased", status: "Dead", date: "10-Jan-2024", time: "09:10", from: "stable",  to: "outside", by: "Walk"   },
            { horse: "Horse 9", reason: "Deceased", status: "Dead", date: "09-Jan-2024", time: "07:40", from: "barn",    to: "yard",    by: "Truck"  },
            { horse: "Horse 10",reason: "Deceased", status: "Dead", date: "14-Jan-2024", time: "16:28", from: "inside",  to: "outside", by: "Ride"   },
        ],
        []
    );

  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);

  const addRow = (payload) => {
    setRows((r) => [...r, payload]);
  };
  return (
    <div>
        <div className='flex justify-between items-center mb-10'>
            <p className='text-black text-4xl font-medium'>Check Point</p>
            <button
                onClick={() => setOpen(true)}
                 className='flex gap-2 bg-main px-3 py-1 text-xl items-center text-white rounded-md hover:opacity-90'>
                <IoMdAdd />
                Add Check Point
            </button>
        </div>
        <Table rows={rows}/>
        <AddModal open={open} onClose={() => setOpen(false)} onSubmit={addRow} />
    </div>
  )
}
