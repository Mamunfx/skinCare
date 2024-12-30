import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllQue = () => {
  const [GridLayoutNumber, setGridLayoutNumber] = useState(3);
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
        return 'grid grid-cols-3 gap-2';
    }
  };

  const handleGridLayoutChange = (e) => {
    setGridLayoutNumber(Number(e.target.value));
  };

  return (
    <div className='space-y-6'>
      <div className="container mx-auto py-6">
        <h2 className="text-3xl font-bold text-center mb-6">All Queries</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Search by Product Name:</label>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg flex-grow"
              placeholder="Enter product name"
            />
            <button 
              onClick={handleSearch} 
              className="btn btn-primary ml-2"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Grid Layout:</label>
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

        <div className={getGridColsClass(GridLayoutNumber)}>
          {filteredQueries.map(query => (
            <div key={query._id} className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-xl font-bold">{query.queryTitle}</h3>
              <p><strong>Product Name:</strong> {query.productName}</p>
              <p><strong>Product Brand:</strong> {query.productBrand}</p>
              <p><strong>Reason:</strong> {query.boycottingReasonDetails}</p>
              <p><strong>Posted on:</strong> {new Date(query.createdAt).toLocaleString()}</p>
              <img src={query.productImageUrl} alt={query.productName} className="mt-4 max-w-full h-32"/>
              <button className='btn btn-primary'>Recommendation Count: {query.recommendationCount}</button>
              <Link className='btn' to={`/QueDetails/${query._id}`}>Recommend</Link>
            </div>
          ))}
          {filteredQueries.length === 0 && <p className="text-center text-gray-500">No queries found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AllQue;
