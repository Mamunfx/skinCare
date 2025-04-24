import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingState from './../Components/LoadingState';

const AllQue = () => {
  const [GridLayoutNumber, setGridLayoutNumber] = useState(null);
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('https://a11-server-tau.vercel.app/queries',{
          withCredentials:true
        });
        const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQueries(sortedQueries);
        setFilteredQueries(sortedQueries);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`https://a11-server-tau.vercel.app/searchqueries?productName=${searchTerm}`,{
          withCredentials:true
        });
        setFilteredQueries(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setFilteredQueries(queries);
    }
  };

  const getGridColsClass = (num) => {
    switch (num) {
      case 1:
        return 'grid grid-cols-1 gap-2';
      case 2:
        return 'grid grid-cols-2 gap-2';
      case 3:
        return 'grid grid-cols-3 gap-2';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2';
    }
  };

  const handleGridLayoutChange = (e) => {
    setGridLayoutNumber(Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold text-center mb-6">All Queries</h2>

        <div className='flex flex-col lg:flex-row justify-between'>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Search by Product Name:
          </label>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg flex-grow"
              placeholder="Enter exact product name"
            />
            <button onClick={handleSearch} className="btn ml-2 bg-pink-200 ">
              Search
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Select Grid Layout
          </label>
          <select
            value={GridLayoutNumber}
            onChange={handleGridLayoutChange}
            className="p-2 border rounded-lg"
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
          </select>
        </div>
        </div>

        {
          loading? <LoadingState></LoadingState> :
          <div
          className={`default-classname ${getGridColsClass(GridLayoutNumber)}`}
        >
          {filteredQueries.map((query) => (
            <div className="card bg-base-100 shadow-xl rounded-lg">
            <figure className="px-8 pt-8">
              <img
                src={query.productImageUrl}
                alt={query.productName}
                className="rounded-lg h-48 w-full object-scale-down"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl text-center font-semibold mb-4">
                {query.queryTitle}
              </h2>
              <div className="space-y-2">
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
              <div className="flex justify-left lg:justify-center mt-4">
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    {query.recommendationCount}
                  </span>
                  <button className="rounded-md px-2  bg-pink-300">
                    Recommendation Count
                  </button>
                </div>
                <Link
                  className="btn btn-outline border-2 border-pink-300 px-6 py-2 rounded-md ml-2"
                  to={`/QueDetails/${query._id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          ))}
          {filteredQueries.length === 0 && (
            <p className="text-center text-gray-500">No queries found.</p>
          )}
        </div>
        }
      </div>
    </div>
  );
};

export default AllQue;
