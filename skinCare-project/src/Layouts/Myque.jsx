import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './../AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Myque = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [queries, setQueries] = useState([]);

  const axiosInstance=useAxiosSecure();

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axiosInstance.get(`/myqueries/${userEmail}`,{withCredentials:true})
        const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQueries(sortedQueries);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, [userEmail]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/queries/${id}`,{withCredentials:true});
      setQueries((prevQueries) => prevQueries.filter((query) => query._id !== id));
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  return (
    <div className='space-y-6'>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            
            <button className="btn btn-primary">
              <Link to="/AddQue">Add a query</Link>
            </button>
          </div>
        </div>
      </div> 
      
      <div className="container mx-auto py-6 ">
        <h2 className="text-3xl font-bold text-center mb-6">My Queries</h2>
        <div className="grid grid-cols-3 gap-2">
          {queries.map((query) => (
            <div key={query._id} className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-xl font-bold">{query.queryTitle}</h3>
              <p><strong>Product Name:</strong> {query.productName}</p>
              <p><strong>Product Brand:</strong> {query.productBrand}</p>
              <p><strong>Reason:</strong> {query.boycottingReasonDetails}</p>
              <p><strong>Posted on:</strong> {new Date(query.createdAt).toLocaleString()}</p>
              <img src={query.productImageUrl} alt={query.productName} className="mt-4 max-w-full h-32" />
              <div className="flex space-x-2">
                <Link className="btn" to={`/QueDetails/${query._id}`}>View Details</Link>
                <Link className="btn" to={`/UpdateQue/${query._id}`}>Update</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(query._id)}>Delete</button>
              </div>
            </div>
          ))}
          {queries.length === 0 && <p className="text-center text-gray-500">No queries found.</p>}
        </div>
      </div>
    </div>
  );
};

export default Myque;
