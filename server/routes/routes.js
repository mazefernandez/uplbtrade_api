'use strict'

var express = require('express')
var router = express.Router()

var customerCtrl = require('../controllers/customer.js')

//routes for customers
router.post('/api/customers', customerCtrl.addCustomer)
router.put('/api/customers/:id', customerCtrl.updateCustomer)

module.exports = router;
