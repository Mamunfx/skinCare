import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllQue = () => {
  const [GridLayoutNumber, setGridLayoutNumber] = useState(null);
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQueries, setFilteredQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/queries',{
          withCredentials:true
        });
        const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQueries(sortedQueries);
        setFilteredQueries(sortedQueries);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`http://localhost:5001/searchqueries?productName=${searchTerm}`,{
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

        <div
          className={`default-classname ${getGridColsClass(GridLayoutNumber)}`}
        >
          {filteredQueries.map((query) => (
            <div className="card bg-base-100  shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={query.productImageUrl}
                  className="rounded-xl h-48 w-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{query.queryTitle}</h2>
                <p>
                  <strong>Product Name:</strong> {query.productName}
                </p>
                <p>
                  <strong>Product Brand:</strong> {query.productBrand}
                </p>
                <p>
                  <strong>Reason:</strong> {query.boycottingReasonDetails}
                </p>
                <p>
                  <strong>Posted on:</strong>{" "}
                  {new Date(query.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  

                  <div className="indicator">
                    <span className="indicator-item badge badge-secondary ">
                    {query.recommendationCount}
                    </span>
                    <button className="rounded-md px-2 bg-pink-200">Recommendation Count</button>
                  </div>

                  <Link
                    className="btn bg-pink-200 "
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
      </div>
    </div>
  );
};

export default AllQue;
