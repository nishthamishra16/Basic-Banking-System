import React, { useState, useEffect } from "react";
import axios from "axios";

function TransferFunds() {
  const [srcId, setSrcId] = useState("");
  const [destId, setDestId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [accountIds, setAccountIds] = useState([]);

  // Fetch all account IDs when the component mounts
  useEffect(() => {
    const fetchAccountIds = async () => {
      try {
        const response = await axios.get("http://localhost:3100/customers");
        setAccountIds(response.data.response.map((account) => account.ac_id));
      } catch (error) {
        console.error("Error fetching account IDs", error);
      }
    };

    fetchAccountIds();
  }, []);

  // Filter out the source account ID from the dropdown options
  const filteredAccountIds = accountIds.filter((id) => id != srcId);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!srcId || !destId || !amount) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.put("http://localhost:3100/transfer", {
        srcId,
        destId,
        amount: parseFloat(amount),
      });
      setMessage(response.data.msg);
      alert("Transfer successful!"); // Throw an alert
      window.location.href = "/customers"; // Redirect to ViewCustomers component
    } catch (error) {
      console.error(error);
      setMessage("Error transferring funds");
    }
  };

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center ">
      <h2 class="text-white text-4xl font-bold m-4 p-4">Transfer Funds</h2>
      <form onSubmit={handleTransfer} class="flex flex-col">
        <div class="m-1 p-1">
          <label for="src" class="text-white cursor-pointer">
            Source Account ID:
          </label>
          <input
            class="rounded bg-slate-500 ml-2 text-white"
            id="src"
            type="text"
            value={srcId}
            onChange={(e) => setSrcId(e.target.value)}
            required
          />
        </div>
        <div class="m-1 p-1">
          <label for="drop" class="text-white cursor-pointer">
            Destination Account ID:
          </label>
          <select
            id="drop"
            class="rounded bg-slate-500 ml-2 text-white"
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            required
          >
            <option
              class="rounded bg-slate-500 ml-2 text-white"
              value=""
              disabled
            >
              Select Destination Account
            </option>
            {filteredAccountIds.map((id) => (
              <option
                class="rounded bg-slate-500 ml-2 text-white"
                key={id}
                value={id}
              >
                {id}
              </option>
            ))}
          </select>
        </div>
        <div class="m-1 p-1">
          <label for="amt" class="text-white cursor-pointer">
            Amount:
          </label>
          <input
            class="rounded bg-slate-500 ml-2 text-white"
            id="amt"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          class=" m-4 text-white text-xl p-2 rounded bg-blue-500 hover:bg-blue-700"
          type="submit"
        >
          Transfer
        </button>
      </form>
      {message && <p class="text-white text-xl">{message}</p>}
    </div>
  );
}

export default TransferFunds;
