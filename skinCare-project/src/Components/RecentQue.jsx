import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecentQue = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchRecentQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/queries',{
          withCredentials:true
        });
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
    <div className="container mx-auto py-6">
      <h2 className="text-4xl font-bold text-center mb-6">Recent Queries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-2">
        {queries.map((query) => (
            
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
                 <Link className="btn bg-pink-200" to={`/QueDetails/${query._id}`}>
                   View Details
                 </Link>
           </div>
         </div>
          
        ))}
        {queries.length === 0 && (
          <p className="text-center text-gray-500">No recent queries found.</p>
        )}
      </div>

     


    </div>
  );
};

export default RecentQue;
