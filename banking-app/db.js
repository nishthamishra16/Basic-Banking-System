const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "bankdb",
  port: 5432,
});

client.connect((err, db) => {
  if (err) {
    console.log("Error in connectivity");
    console.log(err);
    return;
  }
  console.log("Connected Successfully");
});

const txid = () => Date.now();

const createNewAccount = (
  { acId, acNm, email, balance },
  onCreate = undefined
) => {
  client.query(
    `insert into customers values($1, $2, $3, $4)`,
    [acId, acNm, email, balance],
    (err, res) => {
      if (err) console.log("Error!! Problem in creating the customer");
      else {
        console.log("New customer added successfully");
        if (onCreate) {
          onCreate(`New customer created successfully`);
        }
      }
    }
  );
};

const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
  client.query(
    `select balance from customers where ac_id = $1`,
    [acId],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const balance = parseFloat(res.rows[0].balance);
        console.log(`Your existing balance is ${balance}`);

        const newBalance = balance - parseFloat(amount);

        client.query(
          `update customers set balance=$1 where ac_id=$2`,
          [newBalance, acId],
          (err, res) => {
            if (err) console.log(`Problem in withdrawing`);
            else {
              console.log(`Amount ${amount} withdrawn successfully`);
              const date = new Date();
              addTransaction({
                tx_id: txid(),
                date: date,
                t_from: acId,
                t_to: -1,
                debit: amount,
                credit: -1,
                curr_bal: newBalance,
              });
              if (onWithdraw)
                onWithdraw(`Amount ${amount} withdrawn successfully`);
            }
          }
        );
      }
    }
  );
};

const deposit = ({ acId, amount }, onDeposit = undefined) => {
  client.query(
    `select balance from customers where ac_id = $1`,
    [acId],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const balance = parseFloat(res.rows[0].balance);
        console.log(`Your existing balance is ${balance}`);

        const newBalance = balance + parseFloat(amount);

        client.query(
          `update customers set balance=$1 where ac_id=$2`,
          [newBalance, acId],
          (err, res) => {
            if (err) console.log(`Problem in depositing`);
            else {
              console.log(`Amount ${amount} deposited successfully`);
              const date = new Date();
              addTransaction({
                tx_id: txid(),
                date: date,
                t_from: -1,
                t_to: acId,
                debit: -1,
                credit: amount,
                curr_bal: newBalance,
              });
              if (onDeposit)
                onDeposit(`Amount ${amount} deposited successfully`);
            }
          }
        );
      }
    }
  );
};

const transfer = ({ srcId, destId, amount }, onTransfer = undefined) => {
  client.query(
    `select balance from customers where ac_id=$1`,
    [srcId],
    (err, res) => {
      if (err) console.log(`Error finding balance of srcId`);
      else {
        let srcBal = parseFloat(res.rows[0].balance);
        client.query(
          `select balance from customers where ac_id=$1`,
          [destId],
          (err, res) => {
            if (err) console.log(`Error finding destId`);
            else {
              let destBal = parseFloat(res.rows[0].balance);
              const newSrcBal = srcBal - parseFloat(amount);
              const newDestBal = destBal + parseFloat(amount);
              client.query(
                `update customers set balance=$1 where ac_id=$2`,
                [newSrcBal, srcId],
                (err, res) => {
                  client.query(
                    `update customers set balance=$1 where ac_id=$2`,
                    [newDestBal, destId],
                    (err, res) => {
                      if (err) console.log(`Error in transferring funds`);
                      else {
                        console.log(`Funds transferred successfully`);
                        let date = new Date();
                        addTransaction({
                          tx_id: txid(),
                          date: date,
                          t_from: srcId,
                          t_to: destId,
                          debit: amount,
                          credit: -1,
                          curr_bal: newSrcBal,
                        });
                        addTransaction({
                          tx_id: txid(),
                          date: date,
                          t_from: srcId,
                          t_to: destId,
                          debit: -1,
                          credit: amount,
                          curr_bal: newDestBal,
                        });
                        if (onTransfer)
                          onTransfer(
                            `Amount ${amount} transferred successfully`
                          );
                      }
                    }
                  );
                }
              );
            }
          }
        );
      }
    }
  );
};

const balance = (acId, onBalance = undefined) => {
  client.query(
    `select balance from customers where ac_id = $1`,
    [acId],
    (err, res) => {
      if (err) {
        console.log("Problem in fetching the balance");
      } else {
        const balance = parseFloat(res.rows[0].balance);
        console.log(`Your account balance is ${balance}`);
        if (onBalance) onBalance(balance);
      }
    }
  );
};

const custTransaction = (acId, onCustTransaction = undefined) => {
  client.query(
    `select * from transactions where t_from=$1 or t_to=$2`,
    [acId, acId],
    (err, res) => {
      if (err) console.log(`Error in fetching transactions`);
      else {
        console.log(res.rows);
        if (onCustTransaction) onCustTransaction(res.rows);
      }
    }
  );
};

const getCustomers = (onGetCustomers = undefined) => {
  client.query(`select * from customers order by ac_id asc`, (err, res) => {
    if (err) console.log(`Error fetching customers`);
    else {
      console.log(res.rows);
      if (onGetCustomers) onGetCustomers(res.rows);
    }
  });
};

const getCustomerById = (acId, onGetCustomerById = undefined) => {
  client.query(`select * from customers where ac_id=$1`, [acId], (err, res) => {
    if (err) console.log(`Error in fetching customer of id ${acId}`);
    else {
      console.log(`Customer of id ${acId} fetched`);
      console.log(res.rows[0]);
      if (onGetCustomerById) onGetCustomerById(res.rows[0]);
    }
  });
};

const addTransaction = ({
  tx_id,
  date,
  t_from,
  t_to,
  debit,
  credit,
  curr_bal,
}) => {
  client.query(
    `insert into transactions values($1, $2, $3, $4, $5, $6, $7)`,
    [tx_id, date, t_from, t_to, debit, credit, curr_bal],
    (err, res) => {
      if (err) console.log(err);
      else {
        console.log(`New transaction added successfully`);
      }
    }
  );
};

module.exports = {
  createNewAccount,
  deposit,
  withdraw,
  transfer,
  balance,
  custTransaction,
  getCustomers,
  getCustomerById,
};

// deposit({ acId: 2, amount: 10 });
// transfer({ srcId: 8, destId: 10, amount: 10 });

// const date = new Date();

// addTransaction({
//   tx_id: 1,
//   date: date,
//   t_from: 2,
//   t_to: 1,
//   debit: 100,
//   credit: 100,
//   curr_bal: 100,
// });

// createNewAccount({
//   acId: 3,
//   acNm: "siddharth",
//   email: "sid@gmail.com",
//   balance: 100,
// });

// balance(1);

// TODO: 1. add constraints to deposit and withdraw
