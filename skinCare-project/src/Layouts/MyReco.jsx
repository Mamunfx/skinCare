import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoadingState from '../Components/LoadingState';
import { AuthContext } from './../AuthProvider';

const MyReco = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUserRecommendations = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/Comments/${user.email}`,{withCredentials:true});
          setRecommendations(response.data);
        } catch (error) {
          setError('Error fetching recommendations.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserRecommendations();
    }, [user.email]);
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/comments/${id}`,{withCredentials:true});
      setRecommendations((prevRecommendations) => prevRecommendations.filter((rec) => rec._id !== id));
    } catch (error) {
      console.error('Error deleting recommendation:', error);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">My Recommendations</h1>
      {recommendations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Reason</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map(rec => (
                <tr key={rec._id}>
                  <td className="py-2 px-4 border-b">{rec?.recommendationTitle}</td>
                  <td className="py-2 px-4 border-b">{rec?.recommendedProductName}</td>
                  <td className="py-2 px-4 border-b">{rec?.recommendationReason}</td>
                  <td className="py-2 px-4 border-b">{new Date(rec.created_at).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="btn btn-danger" onClick={() => handleDelete(rec._id)}>Delete</button>
                  </td>
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

export default MyReco;
