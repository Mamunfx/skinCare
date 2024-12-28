import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingState from '../Components/LoadingState';

const QueDetails = () => {
  const { id } = useParams();
  const [queryDetails, setQueryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/queries/${id}`);
        setQueryDetails(response.data);
      } catch (error) {
        setError('Error fetching query details.');
      } finally {
        setLoading(false);
      }
    };

    fetchQueryDetails();
  }, [id]);

  if (loading) {
    return <LoadingState></LoadingState>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Query Details</h1>
      {queryDetails ? (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-bold">{queryDetails.queryTitle}</h2>
          <p><strong>Product Name:</strong> {queryDetails.productName}</p>
          <p><strong>Product Brand:</strong> {queryDetails.productBrand}</p>
          <p><strong>Reason:</strong> {queryDetails.boycottingReasonDetails}</p>
          <p><strong>User Email:</strong> {queryDetails.userEmail}</p>
          <p><strong>User Name:</strong> {queryDetails.userName}</p>
          <p><strong>Posted on:</strong> {new Date(queryDetails.createdAt).toLocaleString()}</p>
          <p><strong>Recommendation Count:</strong> {queryDetails.recommendationCount}</p>
          <img src={queryDetails.productImageUrl} alt={queryDetails.productName} className="mt-4 max-w-full h-auto"/>
        </div>
      ) : (
        <p>No query details found.</p>
      )}
    </div>
  );
};

export default QueDetails;
