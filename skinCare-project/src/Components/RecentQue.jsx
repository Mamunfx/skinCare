import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingState from './LoadingState';

const RecentQue = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentQueries = async () => {
      try {
        const response = await axios.get('https://a11-server-tau.vercel.app/queries',{
          withCredentials:true
        });
        const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recentQueries = sortedQueries.slice(0, 6);
        setQueries(recentQueries);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching recent queries:', error);
      }
    };

    fetchRecentQueries();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-4xl font-bold text-center mb-6">Recent Queries</h2>

      {loading ? (
        <LoadingState></LoadingState>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 space-y-8">
          {queries.map((query) => (

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
                    <span className="font-medium text-gray-700">
                      Product Name:
                    </span>{" "}
                    {query.productName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Product Brand:
                    </span>{" "}
                    {query.productBrand}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Reason:</span>{" "}
                    {query.boycottingReasonDetails}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Posted on:
                    </span>{" "}
                    {new Date(query.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-left lg:justify-center mt-4">
                  <Link
                    className="btn  bg-pink-300 px-6 py-2 rounded-md "
                    to={`/QueDetails/${query._id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

          ))}
          {queries.length === 0 && (
            <p className="text-center text-gray-500">
              No recent queries found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentQue;
