import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';
import LoadingState from '../Components/LoadingState';

const UpdateQue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useContext(AuthContext);
  const [queryDetails, setQueryDetails] = useState(null);
  const [formState, setFormState] = useState({
    productName: '',
    productBrand: '',
    productImageUrl: '',
    queryTitle: '',
    boycottingReasonDetails: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueryDetails = async () => {
      try {
        const response = await axios.get(`https://a11-server-tau.vercel.app/queries/${id}`);
        setQueryDetails(response.data);
        setFormState({
          productName: response.data.productName,
          productBrand: response.data.productBrand,
          productImageUrl: response.data.productImageUrl,
          queryTitle: response.data.queryTitle,
          boycottingReasonDetails: response.data.boycottingReasonDetails,
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching query details.');
        setLoading(false);
      }
    };

    fetchQueryDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://a11-server-tau.vercel.app/queries/${id}`, formState,{withCredentials:true});
      notify('Query updated successfully!');
      navigate('/Myque');
    } catch (error) {
      setError('Error updating query.');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Update Query</h1>
      {queryDetails ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formState.productName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Product Brand</label>
            <input
              type="text"
              name="productBrand"
              value={formState.productBrand}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Product Image URL</label>
            <input
              type="text"
              name="productImageUrl"
              value={formState.productImageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Query Title</label>
            <input
              type="text"
              name="queryTitle"
              value={formState.queryTitle}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Boycotting Reason Details</label>
            <textarea
              name="boycottingReasonDetails"
              value={formState.boycottingReasonDetails}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="btn bg-pink-200">Update Query</button>
        </form>
      ) : (
        <p>Query details not found.</p>
      )}
    </div>
  );
};

export default UpdateQue;
