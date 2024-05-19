import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const { acId } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/${acId}/transactions`
        );
        setTransactions(response.data.response);
      } catch (error) {
        console.error(error);
        alert("Error fetching transactions");
      }
    };

    fetchTransactions();
  }, [acId]);

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center ">
      <h2 class="text-white text-4xl font-bold m-4 p-4">View Transactions</h2>
      <table>
        <thead>
          <tr class="border border-white">
            <th class="text-white bg-slate-900 p-2">Transaction ID</th>
            <th class="text-white bg-slate-900 p-2">Date</th>
            <th class="text-white bg-slate-900 p-2">From</th>
            <th class="text-white bg-slate-900 p-2">To</th>
            <th class="text-white bg-slate-900 p-2">Debit</th>
            <th class="text-white bg-slate-900 p-2">Credit</th>
            <th class="text-white bg-slate-900 p-2">Current Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (transaction.debit != -1 && transaction.t_from != acId) ||
              (transaction.credit != -1 && transaction.t_to != acId) ? (
              ""
            ) : (
              <tr
                key={transaction.tx_id}
                class="border border-white even:bg-slate-600 odd:bg-slate-700"
              >
                <td class="text-white p-2">{transaction.tx_id}</td>
                <td class="text-white p-2">{transaction.t_date}</td>
                <td class="text-white p-2">
                  {transaction.t_from == -1 ? "self" : transaction.t_from}
                </td>
                <td class="text-white p-2">
                  {transaction.t_to == -1 ? "self" : transaction.t_to}
                </td>
                <td class="text-white p-2">
                  {transaction.debit != -1 ? transaction.debit : "null"}
                </td>
                <td class="text-white p-2">
                  {transaction.credit != -1 ? transaction.credit : "null"}
                </td>
                <td class="text-white p-2">{transaction.c_balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTransactions;
