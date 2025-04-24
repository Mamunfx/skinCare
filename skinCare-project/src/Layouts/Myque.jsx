import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "./../AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Myque = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [queries, setQueries] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axiosInstance.get(`/myqueries/${userEmail}`, {
          withCredentials: true,
        });
        const sortedQueries = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setQueries(sortedQueries);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, [userEmail]);

  const handleSort = (order) => {
    const sortedQueries = [...queries].sort((a, b) => {
      return order === "desc"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });
    setQueries(sortedQueries);
    setSortOrder(order); 
    setDropdownOpen(false); 
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://a11-server-tau.vercel.app/queries/${id}`,
            { withCredentials: true }
          );
          setQueries((prevQueries) =>
            prevQueries.filter((query) => query._id !== id)
          );
          Swal.fire("Deleted!", "Your query has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting query:", error);
          Swal.fire(
            "Error!",
            "There was a problem deleting your query.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="space-y-6 rounded-lg">
      <div
        className="hero"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/LtPFVrT/22445014-2112-w037-n003-68-B-p1-68-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Your queries</h1>
            <p className="mb-5 text-lg">
              Have another query? Just give us some more information and let
              100+ experts discuss your query.
            </p>

            <button className="btn bg-pink-200">
              <Link to="/AddQue">Add a query</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold text-center mb-6">My Queries</h2>

        <div className="flex justify-end mb-6 relative">
          <div className="dropdown relative">
            <button
              className="btn bg-pink-200 px-6 py-2 rounded-md hover:bg-pink-300 transition duration-300 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)} 
            >
              Sort by Date <IoIosArrowDown  className="text-lg font-bold"/>
            </button>
            {dropdownOpen && (
              <ul
                className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 w-48 text-left border border-gray-200"
              >
                <li>
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-pink-300 hover:text-white rounded-t-md w-full text-left transition duration-300"
                    onClick={() => handleSort("desc")}
                  >
                    Newest First
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 text-gray-700 hover:bg-pink-300 hover:text-white rounded-b-md w-full text-left transition duration-300"
                    onClick={() => handleSort("asc")}
                  >
                    Oldest First
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {queries.map((query) => (
            <div
              key={query._id}
              className="card bg-base-100 shadow-xl rounded-lg min-h-[400px] flex flex-col justify-between"
            >
              <figure className="px-8 pt-8">
                <img
                  src={query.productImageUrl}
                  alt={query.productName}
                  className="rounded-lg h-48 w-full object-scale-down"
                />
              </figure>
              <div className="card-body text-center flex flex-col justify-between">
                <h2 className="card-title text-xl font-semibold mb-4 truncate">
                  {query.queryTitle}
                </h2>
                <div className="space-y-2 text-left">
                  <p>
                    <span className="font-medium text-gray-700">Product Name:</span>{" "}
                    {query.productName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Product Brand:</span>{" "}
                    {query.productBrand}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Reason:</span>{" "}
                    {query.boycottingReasonDetails}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Posted on:</span>{" "}
                    {new Date(query.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  <Link
                    className="btn bg-pink-300 px-6 py-2 rounded-md hover:bg-pink-400 transition duration-300"
                    to={`/QueDetails/${query._id}`}
                  >
                    View Details
                  </Link>
                  <Link
                    className="btn bg-pink-300 px-6 py-2 rounded-md flex items-center hover:bg-pink-400 transition duration-300"
                    to={`/UpdateQue/${query._id}`}
                  >
                    <MdEditSquare className="text-xl mr-2" />
                  </Link>
                  <button
                    className="btn bg-pink-300 px-6 py-2 rounded-md flex items-center hover:bg-pink-400 transition duration-300"
                    onClick={() => handleDelete(query._id)}
                  >
                    <RiDeleteBin2Fill className="text-xl mr-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {queries.length === 0 && (
            <p className="text-center text-gray-500">No queries found.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Myque;
