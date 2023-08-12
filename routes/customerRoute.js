const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.get('/', getCustomers);
router.post("/create", createCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);


module.exports = router;
