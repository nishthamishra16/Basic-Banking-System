import React, { useState } from "react";
import axios from "axios";

function CheckBalance() {
  const [balance, setBalance] = useState(null);
  const [acId, setAcId] = useState("");

  const handleCheckBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:3100/${acId}/balance`);
      setBalance(response.data.bal);
    } catch (error) {
      console.error(error);
      alert("Error checking balance");
    }
  };

  return (
    <div>
      <h2>Check Balance</h2>
      <label>Enter Account ID:</label>
      <input
        type="text"
        value={acId}
        onChange={(e) => setAcId(e.target.value)}
      />
      <button onClick={handleCheckBalance}>Check Balance</button>
      {balance !== null && <p>Account Balance: {balance}</p>}
    </div>
  );
}

export default CheckBalance;
