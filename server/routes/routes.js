'use strict'

var express = require('express')
var router = express.Router()

var customerCtrl = require('../controllers/customer.js')
var itemCtrl = require('../controllers/item.js')
var offerCtrl = require('../controllers/offer.js')
var transactionCtrl = require('../controllers/transaction.js')
var appReviewCtrl = require('../controllers/application_review.js')
var customerReviewCtrl = require('../controllers/customer_review.js')
var reportCustomerCtrl = require('../controllers/customer_report.js')
var reportItemCtrl = require('../controllers/item_report.js')
var tagCtrl = require('../controllers/tag.js')


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
router.get('/api/items/id/:img', itemCtrl.getItemByImg)
router.post('/api/items', itemCtrl.addItem)
router.put('/api/items/:id', itemCtrl.updateItem)
router.delete('/api/items/:id', itemCtrl.deleteItem)

router.get('/api/items/search/:search', itemCtrl.searchItems)
router.post('/api/items/tags', itemCtrl.searchItemTags)
router.post('/api/items/ids', itemCtrl.getItemsByIds)

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
router.get('/api/transactions/buyer/:id', transactionCtrl.getBuyerTransactions)
router.get('/api/transactions/seller/:id', transactionCtrl.getSellerTransactions)
router.get('/api/transactions/logs', transactionCtrl.getLogs)
router.post('/api/transactions', transactionCtrl.addTransaction)

//routes for application reviews
router.get('/api/application-reviews/customers', appReviewCtrl.getReviewCustomers)
router.get('/api/application-reviews/count', appReviewCtrl.getCount)
router.get('/api/application-reviews/average', appReviewCtrl.getAverage)

router.get('/api/application-reviews', appReviewCtrl.getApplicationReviews) 
router.get('/api/application-reviews/:id', appReviewCtrl.getApplicationReview)
router.post('/api/application-reviews', appReviewCtrl.addApplicationReview)
router.delete('/api/application-reviews/:id', appReviewCtrl.deleteApplicationReview)

router.get('/api/application-reviews/rating', appReviewCtrl.getRating)

//routes for customer reviews
router.get('/api/customer-reviews', customerReviewCtrl.getCustomerReviews)
router.get('/api/customer-reviews/:id', customerReviewCtrl.getCustomerReview)
router.post('api/customer-reviews', customerReviewCtrl.addCustomerReview)
router.delete('/api/customer-reviews/:id', customerReviewCtrl.deleteCustomerReview)

router.get('/api/customer-reviews/customer/:id', customerReviewCtrl.getSpecificCustomerReviews)
router.get('/api/customer-reviews/rating/:id', customerReviewCtrl.getRating)

//routes for customer reports
router.get('/api/customer-reports', reportCustomerCtrl.getCustomerReports)
router.post('/api/customer-reports', reportCustomerCtrl.addCustomerReport)

//routes for item reports
router.get('/api/item-reports', reportItemCtrl.getItemReports)
router.post('/api/item-reports', reportItemCtrl.addItemReport)

//routes for tags
router.get('/api/tags', tagCtrl.getTags)
router.get('/api/tags/item/:id', tagCtrl.getTagsFromItem)
router.post('/api/tags', tagCtrl.addTags)
router.delete('/api/tags/:id', tagCtrl.deleteTags)

module.exports = router
