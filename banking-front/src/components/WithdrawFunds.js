import React, { useState } from "react";
import axios from "axios";

function WithdrawFunds() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3100/withdraw",
        formData
      );
      alert(response.data.msg);
      window.location.href = "/customers"; // Redirect to ViewCustomers component
    } catch (error) {
      console.error(error);
      alert("Error withdrawing funds");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center ">
      <h2 class="text-white text-4xl font-bold m-4 p-4">Withdraw Funds</h2>
      <form onSubmit={handleSubmit} class="flex flex-col">
        <div class="m-1 p-1">
          <label for="acId" class="text-white cursor-pointer">
            Account ID:
          </label>
          <input
            id="acId"
            type="text"
            name="acId"
            class="rounded bg-slate-500 ml-2 text-white"
            onChange={handleChange}
          />
        </div>

        <div class="m-1 p-1">
          <label for="amount" class="text-white cursor-pointer">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            name="amount"
            class="rounded bg-slate-500 ml-2 text-white"
            onChange={handleChange}
          />
        </div>
        <button
          class=" m-4 text-white text-xl p-2 rounded bg-blue-500 hover:bg-blue-700"
          type="submit"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
}

export default WithdrawFunds;
