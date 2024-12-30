import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecentQue = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchRecentQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/queries');
        const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recentQueries = sortedQueries.slice(0, 6);
        setQueries(recentQueries);
      } catch (error) {
        console.error('Error fetching recent queries:', error);
      }
    };

    fetchRecentQueries();
  }, []);

  return (
    <div className='container mx-auto py-6'>
      <h2 className="text-3xl font-bold text-center mb-6">Recent Queries</h2>
      <div className="grid grid-cols-3 gap-2">
        {queries.map(query => (
          <div key={query._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-bold">{query.queryTitle}</h3>
            <p><strong>Product Name:</strong> {query.productName}</p>
            <p><strong>Product Brand:</strong> {query.productBrand}</p>
            <p><strong>Reason:</strong> {query.boycottingReasonDetails}</p>
            <p><strong>Posted on:</strong> {new Date(query.createdAt).toLocaleString()}</p>
            <img src={query.productImageUrl} alt={query.productName} className="mt-4 max-w-full h-32"/>
            <Link className='btn' to={`/QueDetails/${query._id}`}>View Details</Link>
          </div>
        ))}
        {queries.length === 0 && <p className="text-center text-gray-500">No recent queries found.</p>}
      </div>
    </div>
  );
};

export default RecentQue;
