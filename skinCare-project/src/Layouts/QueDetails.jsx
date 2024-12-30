import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingState from '../Components/LoadingState';
import { AuthContext } from '../AuthProvider';

const QueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [queryDetails, setQueryDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [formState, setFormState] = useState({
    recommendationTitle: '',
    recommendedProductName: '',
    recommendedProductImage: '',
    recommendationReason: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const queryResponse = await axios.get(`http://localhost:5001/queries/${id}`);
        setQueryDetails(queryResponse.data);

        const commentsResponse = await axios.get(`http://localhost:5001/Indivucomments/${id}`);
        setRecommendations(commentsResponse.data);
      } catch (err) {
        setError('Error fetching query details or recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchQueryDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      query_id: id,
      recommendationTitle: formState.recommendationTitle,
      recommendedProductName: formState.recommendedProductName,
      recommendedProductImage: formState.recommendedProductImage,
      recommendationReason: formState.recommendationReason,
      userEmail: user?.email,
      recommenderEmail: user?.email,
      recommenderName: user?.displayName || 'Anonymous',
      created_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:5001/comments', newRecommendation,{withCredentials:true});
      const newComment = response.data;
      
      const commentsResponse = await axios.get(`http://localhost:5001/Indivucomments/${id}`,{withCredentials:true});
        setRecommendations(commentsResponse.data);

      setQueryDetails((prev) => ({
        ...prev,
        recommendationCount: prev.recommendationCount + 1,
      }));
      setFormState({
        recommendationTitle: '',
        recommendedProductName: '',
        recommendedProductImage: '',
        recommendationReason: '',
      });
    } catch (err) {
      console.error('Error submitting recommendation:', err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Query Details</h1>

      {queryDetails ? (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-bold">{queryDetails.queryTitle}</h2>
          <p><strong>Product Name:</strong> {queryDetails.productName}</p>
          <p><strong>Product Brand:</strong> {queryDetails.productBrand}</p>
          <p><strong>Reason:</strong> {queryDetails.boycottingReasonDetails}</p>
          <p><strong>User Name:</strong> {queryDetails.userName}</p>
          <p><strong>User Email:</strong> {queryDetails.userEmail}</p>
          <p><strong>Posted On:</strong> {new Date(queryDetails.createdAt).toLocaleString()}</p>
          <p><strong>Recommendation Count:</strong> {queryDetails.recommendationCount}</p>
          <img src={queryDetails.productImageUrl} alt={queryDetails.productName} className="mt-4 max-w-full h-auto" />

          <div className="mt-6">
            <h3 className="text-lg font-bold">Add a Recommendation</h3>
            <form onSubmit={handleRecommendationSubmit} className="mb-4">
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Recommendation Title</label>
                <input
                  type="text"
                  name="recommendationTitle"
                  value={formState.recommendationTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Recommended Product Name</label>
                <input
                  type="text"
                  name="recommendedProductName"
                  value={formState.recommendedProductName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Recommended Product Image</label>
                <input
                  type="text"
                  name="recommendedProductImage"
                  value={formState.recommendedProductImage}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-bold mb-1">Recommendation Reason</label>
                <textarea
                  name="recommendationReason"
                  value={formState.recommendationReason}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Recommendation</button>
            </form>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold">Recommendations</h3>
            <div className="space-y-2">
              {recommendations.length ? (
                recommendations.map((rec) => (
                  <div key={rec._id} className="p-2 border rounded-lg shadow-sm bg-gray-100">
                    <h4 className="font-bold">{rec.recommendationTitle}</h4>
                    <p><strong>Recommended Product:</strong> {rec.recommendedProductName}</p>
                    {rec.recommendedProductImage && (
                      <img src={rec.recommendedProductImage} alt={rec.recommendedProductName} className="mt-2 max-w-full h-auto" />
                    )}
                    <p>{rec.recommendationReason}</p>
                    <small>Posted on: {new Date(rec.created_at).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p>No recommendations found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No query details found.</p>
      )}
    </div>
  );
};

export default QueDetails;

