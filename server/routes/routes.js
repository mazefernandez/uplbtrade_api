'use strict'

var express = require('express')
var router = express.Router()

var customerCtrl = require('../controllers/customer.js')
var itemCtrl = require('../controllers/item.js')
var offerCtrl = require('../controllers/offer.js')
var transactionCtrl = require('../controllers/transaction.js')
var uploadCtrl = require('../controllers/upload.js')
var applicationReviewCtrl = require('../controllers/application_review.js')
var customerReviewCtrl = require('../controllers/customer_review.js')

//routes for customers
router.get('/api/customers/:id', customerCtrl.getCustomer)
router.get('/api/customers', customerCtrl.getCustomers)
router.get('/api/customers/email/:email', customerCtrl.getCustomerByEmail)
router.post('/api/customers', customerCtrl.addCustomer)
router.put('/api/customers/:id', customerCtrl.updateCustomer)

router.get('/api/customers/:id/items', customerCtrl.getCustomerItems)
router.get('/api/customers/search/:search', customerCtrl.searchCustomerItems)

//routes for items
router.get('/api/items', itemCtrl.getItems)
router.get('/api/items/:id', itemCtrl.getItem)
router.post('/api/items', uploadCtrl.upload.single('image'), itemCtrl.addItem)
router.put('/api/items/:id', uploadCtrl.upload.single('image'), itemCtrl.updateItem)
router.delete('/api/items/:id', itemCtrl.deleteItem)

router.get('/api/items/search/:search', itemCtrl.searchItems)

//routes for offers
router.get('/api/offers', offerCtrl.getOffers)
router.get('/api/offers/:id', offerCtrl.getOffer)
router.post('/api/offers', offerCtrl.addOffer)
router.delete('/api/offers/:id', offerCtrl.deleteOffer)

router.get('/api/offers/buyer/:id', offerCtrl.getOfferBuying)
router.get('/api/offers/seller/:id', offerCtrl.getOfferSelling)

router.put('/api/offers/accept/:id', offerCtrl.acceptOffer)
router.put('/api/offers/decline/:id', offerCtrl.declineOffer)

//routes for transactions
router.get('/api/transactions', transactionCtrl.getTransactions)
router.get('/api/transactions/:id', transactionCtrl.getTransaction)
router.post('/api/transactions', transactionCtrl.addTransaction)

//routes for application reviews 
router.get('/api/application-reviews/customers', applicationReviewCtrl.getReviewCustomers)

router.get('/api/application-reviews', applicationReviewCtrl.getApplicationReviews) 
router.get('/api/application-reviews/:id', applicationReviewCtrl.getApplicationReview)
router.post('/api/application-reviews',applicationReviewCtrl.addApplicationReview)
router.delete('/api/application-reviews/:id', applicationReviewCtrl.deleteApplicationReview)

router.get('/api/application-reviews/rating', applicationReviewCtrl.getRating)

//routes for customer reviews
router.get('/api/customer-reviews', customerReviewCtrl.getCustomerReviews)
router.get('/api/customer-reviews/:id', customerReviewCtrl.getCustomerReview)
router.delete('/api/customer-reviews/:id', customerReviewCtrl.deleteCustomerReview)

router.get('/api/customer-reviews/customer/:id', customerReviewCtrl.getSpecificCustomerReviews)
router.get('/api/customer-reviews/rating/:id', applicationReviewCtrl.getRating)

module.exports = router;
