import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleViewCustomers = () => {
    navigate("/customers");
  };

  const handleCreateCustomer = () => {
    navigate("/create");
  };

  const handleDepositFunds = () => {
    navigate("/deposit");
  };

  const handleWithdrawFunds = () => {
    navigate("/withdraw");
  };

  const handleTransferFunds = () => {
    navigate("/transfer");
  };

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center bg-[url('https://wallpaperaccess.com/full/3059655.jpg')] bg-cover bg-no-repeat">
      <div class="h-screen w-screen flex flex-col bg-blue-600/30 items-center backdrop-brightness-50">
        <h1 class="text-white text-6xl font-bold p-4 mt-4">
          Basic Banking App
        </h1>
        <h2 class=" text-purple-500 text-5xl p-3 m-2 mb-7">
          The Sparks Foundation
        </h2>
        <button
          onClick={handleViewCustomers}
          class="text-white p-2 m-2 border rounded bg-slate-700 hover:bg-slate-800"
        >
          View Customers
        </button>
        <button
          onClick={handleCreateCustomer}
          class="text-white p-2 m-2 border rounded bg-slate-700 hover:bg-slate-800"
        >
          Create New Customer
        </button>
        <button
          onClick={handleDepositFunds}
          class="text-white p-2 m-2 border rounded bg-slate-700 hover:bg-slate-800"
        >
          Deposit Funds
        </button>
        <button
          onClick={handleWithdrawFunds}
          class="text-white p-2 m-2 border rounded bg-slate-700 hover:bg-slate-800"
        >
          Withdraw Funds
        </button>
        <button
          onClick={handleTransferFunds}
          class="text-white p-2 m-2 border rounded bg-slate-700 hover:bg-slate-800"
        >
          Transfer Funds
        </button>
      </div>
    </div>
  );
};

export default Homepage;
