import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoadingState from '../Components/LoadingState';
import { AuthContext } from './../AuthProvider';

const RcForMe = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [queries, setQueries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/myqueries/${userEmail}`);
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    if (userEmail) {
      fetchQueries();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const allRecommendations = await Promise.all(
          queries.map(async (query) => {
            const response = await axios.get(`http://localhost:5001/Indivucomments/${query._id}`);
            return response.data;
          })
        );
        setRecommendations(allRecommendations.flat());
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (queries.length > 0) {
      fetchRecommendations();
    }
  }, [queries]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Recommendations for You</h2>
      {recommendations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Reason</th>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{rec.recommendationTitle}</td>
                  <td className="py-2 px-4 border-b">{rec.recommendedProductName}</td>
                  <td className="py-2 px-4 border-b">{rec.recommendationReason}</td>
                  <td className="py-2 px-4 border-b">{rec.userEmail}</td>
                  <td className="py-2 px-4 border-b">{new Date(rec.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No recommendations found.</p>
      )}
    </div>
  );
};

export default RcForMe;
