'use strict'

var express = require('express')
var router = express.Router()

var customerCtrl = require('../controllers/customer.js')
var itemCtrl = require('../controllers/item.js')
var offerCtrl = require('../controllers/offer.js')

//routes for customers
router.get('/api/customers', customerCtrl.getCustomers)
router.get('/api/customers/:id', customerCtrl.getCustomer)
router.get('/api/customers/email/:email', customerCtrl.getCustomerByEmail)
router.post('/api/customers', customerCtrl.addCustomer)
router.put('/api/customers/:id', customerCtrl.updateCustomer)

router.get('/api/customers/:id/items', customerCtrl.getCustomerItems)
router.get('/api/customers/search/:search', customerCtrl.searchCustomerItems)

//routes for items
router.get('/api/items', itemCtrl.getItems)
router.get('/api/items/:id', itemCtrl.getItem)
router.post('/api/items', itemCtrl.addItem)
router.put('/api/items/:id', itemCtrl.updateItem)
router.delete('/api/items/:id', itemCtrl.deleteItem)

router.get('/api/items/search/:search', itemCtrl.searchItems)
//routes for offers
router.get('/api/offers', offerCtrl.getOffers)
router.get('/api/offers/:id', offerCtrl.getOffer)
router.post('/api/offers', offerCtrl.addOffer)
router.delete('api/offers:id', offerCtrl.deleteOffer)

module.exports = router;
