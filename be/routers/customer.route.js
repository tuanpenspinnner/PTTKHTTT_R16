const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.post("/login", customerController.loginCustomer);
router.post("/register", customerController.registerCustomer);


module.exports = router;
