const { response } = require("express");
const express = require("express");

const cors = require("cors");
const app = express();
app.use(cors());

const port = 3100;

const {
  createNewAccount,
  deposit,
  withdraw,
  balance,
  transfer,
  custTransaction,
  getCustomers,
  getCustomerById,
} = require("./db");

//   /customers
//   /id/balance
//   /id/transactions
//   /create
//   /deposit
//   /withdraw
//   /transfer

app.post("/create", express.json(), (req, res) => {
  createNewAccount(req.body, (msg) => {
    res.json({ sts: "success", msg });
  });
});

app.put("/transfer", express.json(), (req, res) => {
  transfer(req.body, (msg) => {
    res.json({ sts: "success", msg });
  });
});

app.put("/withdraw", express.json(), (req, res) => {
  withdraw(req.body, (msg) => {
    res.json({ sts: "success", msg });
  });
});

app.put("/deposit", express.json(), (req, res) => {
  deposit(req.body, (msg) => {
    res.json({ sts: "success", msg });
  });
});

app.get("/:acId/balance", (req, res) => {
  console.log(req.params);
  const acId = req.params.acId;
  balance(acId, (bal) => {
    res.json({ bal });
  });
});

app.get("/:acId/transactions", (req, res) => {
  const acId = req.params.acId;
  custTransaction(acId, (response) => {
    res.json({ sts: "success", response });
  });
});

app.get("/customers", (req, res) => {
  getCustomers((response) => {
    res.json({ sts: "success", response });
  });
});

app.get("/customers/:acId", (req, res) => {
  const acId = req.params.acId;
  getCustomerById(acId, (response) => {
    res.json({ sts: "success", response });
  });
});

app.listen(port, () => {
  console.log(`Banking App app listening on port ${port}`);
});
