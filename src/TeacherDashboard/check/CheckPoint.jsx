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
    <div className='px-4'>
        <div className="add-horse-btn-section mb-5 flex flex-col md:flex-row items-center justify-between ">
                <h6 className="title-2 dark:text-gray-100">
                  Check Point
                </h6>
                <button
                onClick={() => setOpen(true)}
                  className="mt-3 md:mt-0 flex items-center gap-2 rounded-md bg-main px-3 py-1 text-xl font-medium text-white hover:opacity-90 dark:bg-main"
                >
                  <IoMdAdd />
                  Add Check Point
                </button>
              </div>
        <Table rows={rows}/>
        <AddModal open={open} onClose={() => setOpen(false)} onSubmit={addRow} />
    </div>
  )
}
