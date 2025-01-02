import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
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
        const response = await axiosInstance.get(`/myqueries/${userEmail}`, {withCredentials:true});
        const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQueries(sortedQueries);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, [userEmail]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://a11-server-tau.vercel.app/queries/${id}`, {withCredentials:true});
          setQueries((prevQueries) => prevQueries.filter((query) => query._id !== id));
          Swal.fire(
            'Deleted!',
            'Your query has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting query:', error);
          Swal.fire(
            'Error!',
            'There was a problem deleting your query.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className='space-y-6 rounded-lg'>
      <div
        className="hero "
        style={{
          backgroundImage: "url(https://i.ibb.co.com/LtPFVrT/22445014-2112-w037-n003-68-B-p1-68-1.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Your queries</h1>
            <p className="mb-5 text-lg">
              Have another query ? just give us some more information and let 100+ expert discuss about your query 
            </p>
            
            <button className="btn bg-pink-200">
              <Link to="/AddQue">Add a query</Link>
            </button>
          </div>
        </div>
      </div> 
      
      <div className="container mx-auto py-6  ">
        <h2 className="text-3xl font-bold text-center mb-6">My Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {queries.map((query) => (
           <div key={query._id}  className="card bg-base-100  shadow-xl">
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
             <div className="flex space-x-2">
                <Link className="btn bg-pink-200" to={`/QueDetails/${query._id}`}>View Details</Link>
                <Link className="btn bg-pink-200" to={`/UpdateQue/${query._id}`}>Update</Link>
                <button className="btn btn-danger bg-pink-200" onClick={() => handleDelete(query._id)}>Delete</button>
              </div>
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
