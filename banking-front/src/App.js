import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import TransferFunds from "./components/TransferFunds";
import WithdrawFunds from "./components/WithdrawFunds";
import DepositFunds from "./components/DepositFunds";
import CheckBalance from "./components/CheckBalance";
import ViewTransactions from "./components/ViewTransactions";
import ViewCustomers from "./components/ViewCustomers";
import ViewCustomer from "./components/ViewCustomer";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/transfer" element={<TransferFunds />} />
          <Route path="/withdraw" element={<WithdrawFunds />} />
          <Route path="/deposit" element={<DepositFunds />} />
          <Route path="/:acId/balance" element={<CheckBalance />} />
          <Route path="/:acId/transactions" element={<ViewTransactions />} />
          <Route path="/customers" element={<ViewCustomers />} />
          <Route path="/customers/:acId" element={<ViewCustomer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
