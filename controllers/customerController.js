const asyncHandler = require("express-async-handler");
const Customer = require("../models/customer");

//@doc Register a Customer
//@route POST  /api/customers/create
//@access private
const createCustomer = asyncHandler(async (req, res) => {
  const { first_name, last_name, street, address, city, state, email, phone } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !street ||
    !address ||
    !city ||
    !state ||
    !email ||
    !phone
  ) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const customer = await Customer.create({
    first_name,
    last_name,
    street,
    address,
    city,
    state,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(customer);
});

//@doc Get all Customers
//@route GET  /api/customers
//@access private
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({ user_id: req.user.id });

  res.status(200).json(customers);
});
//@doc Update a Customer
//@route POST  /api/customers/update/:id
//@access private
const updateCustomer = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Body is Empty");
  }
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not Found");
  }
  if (customer.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "Users Don't have permission to update other user Customer"
    );
  }
  const updateCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateCustomer);
});
//@doc Delete a Customer
//@route GET  /api/customers/update/:id
//@access private
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer not Found");
  }
  if (customer.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "Users Don't have permission to Delete other user Customer"
    );
  }
  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedCustomer);
});

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};
