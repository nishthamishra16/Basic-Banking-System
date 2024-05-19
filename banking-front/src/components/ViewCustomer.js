import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ViewCustomer = () => {
  const { acId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomer(acId);
  }, [acId]);

  const fetchCustomer = async (customerId) => {
    try {
      const response = await axios.get(
        `http://localhost:3100/customers/${customerId}`
      );
      if (
        !response.data ||
        !response.data.sts ||
        response.data.sts !== "success"
      ) {
        throw new Error("Customer not found");
      }
      setCustomer(response.data.response);
      setLoading(false);
    } catch (error) {
      setError("Error fetching customer");
      setLoading(false);
      console.error("Error fetching customer:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center ">
      <h2 class="text-white text-4xl font-bold m-4 p-4">Customer Details</h2>
      {customer ? (
        <div class="p-5 m-5 bg-slate-700 rounded-md text-white">
          <p>ID: {customer.ac_id}</p>
          <p>Name: {customer.ac_nm}</p>
          <p>Email: {customer.email}</p>
          <p>Balance: {customer.balance}</p>
          <div>
            <Link to="/deposit">
              <button class=" m-2 pl-1 pr-1 rounded bg-blue-500 hover:bg-blue-700">
                Deposit Funds
              </button>
            </Link>
            <Link to="/withdraw">
              <button class=" m-2 pl-1 pr-1 rounded bg-blue-500 hover:bg-blue-700">
                Withdraw Funds
              </button>
            </Link>
            <Link to="/transfer">
              <button class=" m-2 pl-1 pr-1 rounded bg-blue-500 hover:bg-blue-700">
                Transfer Funds
              </button>
            </Link>
            <Link to={`/${acId}/transactions`}>
              <button class=" m-2 pl-1 pr-1 rounded bg-blue-500 hover:bg-blue-700">
                View Transactions
              </button>
            </Link>
            <Link to="/customers">
              <button class=" m-2 pl-1 pr-1 rounded bg-blue-500 hover:bg-blue-700">
                Back to View Customers
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p>No customer details available</p>
      )}
    </div>
  );
};

export default ViewCustomer;
