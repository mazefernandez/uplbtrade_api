'use strict'

var express = require('express')
var router = express.Router()

var customerCtrl = require('../controllers/customer.js')
var itemCtrl = require('../controllers/item.js')

//routes for customers
router.get('/api/customers', customerCtrl.getCustomers)
router.get('/api/customers/:id', customerCtrl.getCustomer)
router.post('/api/customers', customerCtrl.addCustomer)
router.put('/api/customers/:id', customerCtrl.updateCustomer)

//routes for items
router.get('api/items', itemCtrl.getItems)
router.get('api/items/:id', itemCtrl.getItemsFromCustomer)
router.get('api/items/:id', itemCtrl.getItem)
router.post('api/items', itemCtrl.addItem)
router.put('api/items/:id', itemCtrl.updateItem)
router.delete('api/items/:id', itemCtrl.deleteItem)

module.exports = router;
