import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {

    const [queries, setQueries] = useState([]);    

    useEffect(() => {
        const fetchQueries = async () => {
          try {
            const response = await axios.get('http://localhost:5001/queries',{
              withCredentials:true
            });
            const sortedQueries = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setQueries(sortedQueries);
            setFilteredQueries(sortedQueries);
          } catch (error) {
            console.error('Error fetching queries:', error);
          }
        };
        fetchQueries();
      }, []);
    return (
      <div className="flex flex-col lg:flex-row gap-4 bg-base-100 dark:bg-gray-900 shadow-2xl rounded-lg py-16 px-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Recently discussed product :{" "}
          </h1>
        </div>
        <div className="space-x-6 space-y-3">

          {queries.map((query) => (
            <div className="indicator ">
            <span
              className="indicator-item indicator-end sm:indicator-top md:indicator-top lg:indicator-top  badge badge-secondary">{query.recommendationCount}</span>
            <div className="bg-pink-200 rounded-lg p-2 text-xs md:text-sm lg:text-md ">{query.productName}</div>
          </div>
          ))}

        </div>
      </div>
    );
};

export default Products;