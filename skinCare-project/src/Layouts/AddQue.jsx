import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './../AuthProvider';

const AddQue = () => {
  const {user}=useContext(AuthContext);
  const userProfileImage= user?.photoURL;
  const userEmail= user?.email;
  const userName= user?.displayName;
  const [formData, setFormData] = useState({
    productName: '',
    productBrand: '',
    productImageUrl: '',
    queryTitle: '',
    boycottingReasonDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryData = {
      ...formData,
      userEmail,
      userName,
      userProfileImage,
      createdAt: new Date().toISOString(),
      recommendationCount: 0
    };

    try {
      const response = await axios.post('http://localhost:5001/queries', queryData,{
        withCredentials:true
      });

      setFormData({
        productName: '',
        productBrand: '',
        productImageUrl: '',
        queryTitle: '',
        boycottingReasonDetails: ''
      });
      alert("Added")
    } catch (error) {
      console.error('Error adding query:', error);
    }
  };

  return (
    <div className='space-y-6'>
            
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Brand:</label>
        <input
          type="text"
          name="productBrand"
          value={formData.productBrand}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Image URL:</label>
        <input
          type="text"
          name="productImageUrl"
          value={formData.productImageUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Query Title:</label>
        <input
          type="text"
          name="queryTitle"
          value={formData.queryTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Boycotting Reason Details:</label>
        <textarea
          name="boycottingReasonDetails"
          value={formData.boycottingReasonDetails}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-300  py-2 px-4 rounded-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
      >
        Add Query
      </button>
    </form>
    </div>
    
  );
};

export default AddQue;
