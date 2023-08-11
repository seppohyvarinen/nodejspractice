const db = require("./dbconfig");

// Fetch every customer
const getAllCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) console.error(err);
    else res.json(result.rows);
  });
};

// Get customer by id
const getCustomerById = (req, res) => {
  const query = {
    text: "SELECT * FROM customers WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    } else {
      if (result.rows.length > 0) res.json(result.rows);
      else res.status(404).end();
    }
  });
};

// Add new customer
const addCustomer = (req, res) => {
  const newCust = req.body;

  const query = {
    text: "INSERT INTO customers (firstname, lastname, email, phone) VALUES ($1, $2, $3, $4)",
    values: [newCust.firstname, newCust.lastname, newCust.email, newCust.phone],
  };

  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });

  res.json(newCust);
};

//Delete customer
const deleteCustomer = (req, res) => {
  const query = {
    text: "DELETE FROM customers WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });

  res.status(204).end();
};

// Delete all customers
const deleteAllCust = () => {
  db.query("DELETE FROM customers", (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
};

// Update customer
const updateCustomer = (req, res) => {
  const editedCust = req.body;

  const query = {
    text: "UPDATE customers SET firstname=$1, lastname=$2, email=$3, phone=$4 WHERE id = $5",
    values: [
      editedCust.firstname,
      editedCust.lastname,
      editedCust.email,
      editedCust.phone,
      req.params.id,
    ],
  };

  db.query(query, (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });

  res.json(editedCust);
};
module.exports = {
  getAllCustomers: getAllCustomers,
  getCustomerById: getCustomerById,
  addCustomer: addCustomer,
  deleteCustomer: deleteCustomer,
  updateCustomer: updateCustomer,
  deleteAllCust: deleteAllCust,
};
