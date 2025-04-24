import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingState from "../Components/LoadingState";
import { AuthContext } from "../AuthProvider";

const QueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [queryDetails, setQueryDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [formState, setFormState] = useState({
    recommendationTitle: "",
    recommendedProductName: "",
    recommendedProductImage: "",
    recommendationReason: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const queryResponse = await axios.get(
          `https://a11-server-tau.vercel.app/queries/${id}`
        );
        setQueryDetails(queryResponse.data);

        const commentsResponse = await axios.get(
          `https://a11-server-tau.vercel.app/Indivucomments/${id}`
        );
        setRecommendations(commentsResponse.data);
      } catch (err) {
        setError("Error fetching query details or recommendations.");
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
      recommenderName: user?.displayName || "Anonymous",
      created_at: new Date().toISOString(),
    };

    try {
      await axios.post(
        "https://a11-server-tau.vercel.app/comments",
        newRecommendation,
        { withCredentials: true }
      );

      const commentsResponse = await axios.get(
        `https://a11-server-tau.vercel.app/Indivucomments/${id}`,
        { withCredentials: true }
      );
      setRecommendations(commentsResponse.data);

      setQueryDetails((prev) => ({
        ...prev,
        recommendationCount: prev.recommendationCount + 1,
      }));
      setFormState({
        recommendationTitle: "",
        recommendedProductName: "",
        recommendedProductImage: "",
        recommendationReason: "",
      });
    } catch (err) {
      console.error("Error submitting recommendation:", err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Query Details</h1>

      {queryDetails ? (
        <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-100">
         <div className="flex flex-col lg:flex-row  justify-between px-12 lg:gap-8 ">

         <div className="mt-2 lg:mt-12">
          <h2 className="text-2xl font-bold  mb-4">{queryDetails.queryTitle}</h2>
          <p className="mb-2 text-lg text-gray-700">
            <strong>Product Name:</strong> {queryDetails.productName}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <strong>Product Brand:</strong> {queryDetails.productBrand}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <strong>Reason:</strong> {queryDetails.boycottingReasonDetails}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <strong>User Name:</strong> {queryDetails.userName}
          </p>
          <p className="mb-2 text-lg text-gray-700">
            <strong>User Email:</strong> {queryDetails.userEmail}
          </p>
          <p className="mb-4 text-lg text-gray-700">
            <strong>Posted On:</strong> {new Date(queryDetails.createdAt).toLocaleString()}
          </p>
          </div>

         <div>
         <img
            src={queryDetails.productImageUrl}
            alt={queryDetails.productName}
            className="mt-4 rounded-lg max-w-full h-96 object-center mx-auto shadow-md"
          />
         </div>

      </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 pb-6">Add a Recommendation :</h3>
            <form onSubmit={handleRecommendationSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Recommendation Title
                </label>
                <input
                  type="text"
                  name="recommendationTitle"
                  value={formState.recommendationTitle}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Recommended Product Name
                </label>
                <input
                  type="text"
                  name="recommendedProductName"
                  value={formState.recommendedProductName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Recommended Product Image URL
                </label>
                <input
                  type="text"
                  name="recommendedProductImage"
                  value={formState.recommendedProductImage}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Recommendation Reason
                </label>
                <textarea
                  name="recommendationReason"
                  value={formState.recommendationReason}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-purple-300 to-pink-400 text-white font-bold rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                Submit Recommendation
              </button>
            </form>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800">Recommendations</h3>
            <div className="space-y-4 mt-6">
              {recommendations.length ? (
                recommendations.map((rec) => (
                  <div
                    key={rec._id}
                    className="p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <h4 className="text-lg font-bold text-purple-400">
                      {rec.recommendationTitle}
                    </h4>
                    <p className="text-gray-700">
                      <strong>Recommended Product:</strong> {rec.recommendedProductName}
                    </p>
                    <p className="text-gray-700">
                      <strong>Reason:</strong> {rec.recommendationReason}
                    </p>
                    <small className="block mt-2 text-gray-500">
                      Posted on: {new Date(rec.created_at).toLocaleString()}
                    </small>
                    {rec.recommendedProductImage && (
                      <img
                        src={rec.recommendedProductImage}
                        alt={rec.recommendedProductName}
                        className="mt-4 rounded-lg max-w-full h-auto shadow-sm"
                      />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-700">No recommendations found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No query details found.</p>
      )}
    </div>
  );
};

export default QueDetails;
