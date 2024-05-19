import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3100/customers");
        setCustomers(response.data.response);
      } catch (error) {
        console.error(error);
        alert("Error fetching customers");
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center ">
      <h2 class="text-white text-4xl font-bold m-4 p-4">View Customers</h2>
      <table>
        <thead>
          <tr class="border border-white">
            <th class="text-white bg-slate-900 p-2">Account ID</th>
            <th class="text-white bg-slate-900 p-2">Name</th>
            <th class="text-white bg-slate-900 p-2">Email</th>
            <th class="text-white bg-slate-900 p-2">Balance</th>
            <th class="text-white bg-slate-900 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.ac_id}
              class="border border-white even:bg-slate-600 odd:bg-slate-700"
            >
              <td class="text-white p-2">{customer.ac_id}</td>
              <td class="text-white p-2">{customer.ac_nm}</td>
              <td class="text-white p-2">{customer.email}</td>
              <td class="text-white p-2">{customer.balance}</td>
              <td class="text-white p-2">
                <Link to={`/customers/${customer.ac_id}`}>
                  <button class="pl-1 pr-1 rounded bg-blue-500 hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCustomers;
