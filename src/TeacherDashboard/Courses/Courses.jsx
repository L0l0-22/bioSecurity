import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import EditCourseModal from './EditCourseModal';
import NewCourseModal from './NewCourseModal';
import { IoMdClose } from 'react-icons/io';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import Cookies from "js-cookie";
import react from "../../assets/react.jpg"
import Loading from '../../Loading';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function Courses({ onViewCourse }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null); // <-- new
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // you can make it dynamic later
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // react-paginate is 0-based
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const handleCourseClick = (course) => {
    onViewCourse(course); // this sets selectedCourse inside TeacherDash
  };
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const handleAddCourse = async (newCourse) => {
  const fullCourse = {
    ...newCourse,
    id: courses.length + 1,
  };
  setCourses((prev) => [...prev, fullCourse]);
  onViewCourse(fullCourse); // <-- this line navigates to details
};
const handleDeleteCourse = (id) => {
  try {
    axios.delete(`https://carwashapis.gosmart.ae/delete_record/carwash.user/${id}`)
    toast.success("Course deleted successfully!");
    setCourses((prev) => prev.filter((course) => course.id !== id));
  } catch (err) {
      setError(err.message);
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Failed to delete course!");
    } finally {
      setDeleteModalOpen(false);
    }
};
useEffect(() => {
  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);
      // ⬇️ get token from cookies
      const token = Cookies.get("userToken");
      console.log("Using token:", token);
      const res = await axios.get(
        "https://carwashapis.gosmart.ae/get_all/carwash_user",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`, // attach token
          },
        }
      );
      console.log("✅ API Response:", res.data);
      const mapped = res.data.data.map((u) => ({
        id: u.id,
        name: u.name,
        image: u.image,
        phone: u.phone || "N/A",
        create_date: u.create_date ? new Date(u.create_date).toLocaleDateString("en-GB") : "N/A",
        is_archive: u.is_archive ,
      }));
      setCourses(mapped);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchCourses();
}, []);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  if (loading) return <Loading/>
  if (error) return <p className='text-red-800 bg-red-100 w-full p-6'>Error: {error.message || error.toString()}</p>;

  return (
    <div className="p-6 md:p-10 mt-12 md:mt-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-main">Your Customers</h2>
        <button
          onClick={() => setNewModalOpen(true)}
          className="bg-sec text-xs px-3 py-1 md:px-4 md:py-2 md:text-base text-white rounded-lg hover:bg-hoverSec"
        >
          + New Customers
        </button>
      {newModalOpen && (
        <NewCourseModal
          onClose={() => setNewModalOpen(false)}
          onAddCourse={handleAddCourse}
        />
      )}
      </div>
      <div className="space-y-4">
        {currentCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition relative p-4 flex flex-col md:flex-row gap-4 cursor-pointer"
          >
            <div className="w-full md:w-48">
              <img
                src={course.image || react}
                alt="course"
                className="w-full h-32 md:h-32 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold text-[#0A2E40]">
                  {course.name}
                </h3>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 👈 prevent card click
                      toggleDropdown(course.id);
                    }}
                    className="text-gray-600 hover:bg-sky-100 p-1.5 rounded-md"
                  >
                    <BsThreeDotsVertical size={18} />
                  </button>
                  {openDropdown === course.id && (
                    <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-20 w-40">
                      <ul className="text-sm text-gray-700">
                        <li
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(null);
                            setCourseToEdit(course);   // Set selected course
                            setEditModalOpen(true);    // Open modal
                          }}

                          className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                        >
                          Edit Customers
                        </li>
                        <li
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(null);
                            setCourseToDelete(course);
                            setDeleteModalOpen(true);
                          }}
                          className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                        >
                          Delete Customers
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {editModalOpen && courseToEdit && (
                    <EditCourseModal
                      course={courseToEdit}
                      onClose={() => {
                        setEditModalOpen(false);
                        setCourseToEdit(null);
                      }}
                      onSave={(updatedCourse) => {
                        // update course in state
                        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
                        setEditModalOpen(false);
                        setCourseToEdit(null);
                      }}
                    />
                  )}
                {deleteModalOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()} // 👈 stop click from bubbling to parent
                  >
                      <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
                        <button
                          type="button"
                          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                          onClick={() => setDeleteModalOpen(false)}
                        >
                          <IoMdClose size={24} />
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="flex items-center justify-center my-5">
                          <RiDeleteBin6Fill className="text-gray-300" size={45} />
                        </div>
                        <p className="mb-4 text-gray-500">
                          Are you sure you want to delete <strong>{courseToDelete?.name}</strong>?
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                          <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900"
                          >
                            No, cancel
                          </button>
                          <button
                              onClick={() => handleDeleteCourse(courseToDelete.id)}
                            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                          >
                            Yes, I'm sure
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">📅 Created: <span className="font-medium text-main">{course.create_date}</span></p>
                <p className="text-sm text-gray-500">
                    📞 Phone: <span className="font-medium text-main">{course.phone}</span>
                </p>
                <p className="text-base mt-2 text-gray-500 flex items-center gap-2">
                  {course.is_archive ? (
                    <FaTimesCircle className="text-red-600" />  // red cross icon
                  ) : (
                    <FaCheckCircle className="text-green-600" /> // green check icon
                  )}
                  Status:{" "}
                  <span className={`font-medium ${course.is_archive ? "text-red-600" : "text-green-600"}`}>
                    {course.is_archive ? "Archived" : "Active"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={<span className="px-3 py-1 bg-gray-200 rounded">Prev</span>}
        nextLabel={<span className="px-3 py-1 bg-gray-200 rounded">Next</span>}
        breakLabel={"..."}
        pageCount={Math.ceil(courses.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-6 space-x-2"
        pageClassName="px-3  rounded bg-gray-200"
        activeClassName="bg-sec text-white"
      />
    </div>
  );
}




