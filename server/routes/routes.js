'use strict'

import { Router } from 'express'
var router = Router()

import { getCustomer, getCustomers, getCustomerByEmail, addCustomer, updateCustomer, getCustomerItems, searchCustomerItems } from '../controllers/customer.js'
import { getItems, getItem, addItem, updateItem, deleteItem, searchItems } from '../controllers/item.js'
import { getOffers, getOffer, addOffer, deleteOffer, getOfferBuying, getOfferSelling, acceptOffer, declineOffer } from '../controllers/offer.js'
import { getTransactions, getTransaction, addTransaction, getSellerTransactions, getBuyerTransactions } from '../controllers/transaction.js'
import { upload } from '../controllers/upload.js'
import { getReviewCustomers, getCount, getAverage, getApplicationReviews, getApplicationReview, addApplicationReview, deleteApplicationReview, getRating } from '../controllers/application_review.js'
import { getCustomerReviews, getCustomerReview, addCustomerReview, deleteCustomerReview, getSpecificCustomerReviews } from '../controllers/customer_review.js'
import { getCustomerReports, addCustomerReport } from '../controllers/customer_report.js'

//routes for customers
router.get('/api/customers/:id', getCustomer)
router.get('/api/customers', getCustomers)
router.get('/api/customers/email/:email', getCustomerByEmail)
router.post('/api/customers', addCustomer)
router.put('/api/customers/:id', updateCustomer)

router.get('/api/customers/:id/items', getCustomerItems)
router.get('/api/customers/search/:search', searchCustomerItems)

//routes for items
router.get('/api/items', getItems)
router.get('/api/items/:id', getItem)
router.post('/api/items', addItem)
router.put('/api/items/:id', upload.single('image'), updateItem)
router.delete('/api/items/:id', deleteItem)

router.get('/api/items/search/:search', searchItems)

//routes for offers
router.get('/api/offers', getOffers)
router.get('/api/offers/:id', getOffer)
router.post('/api/offers', addOffer)
router.delete('/api/offers/:id', deleteOffer)

router.get('/api/offers/buyer/:id', getOfferBuying)
router.get('/api/offers/seller/:id', getOfferSelling)

router.put('/api/offers/accept/:id', acceptOffer)
router.put('/api/offers/decline/:id', declineOffer)

//routes for transactions
router.get('/api/transactions', getTransactions)
router.get('/api/transactions/:id', getTransaction)
router.get('/api/transactions/buyer/:id', getBuyerTransactions)
router.get('/api/transactions/seller/:id', getSellerTransactions)
router.post('/api/transactions', addTransaction)

//routes for application reviews 
router.get('/api/application-reviews/customers', getReviewCustomers)
router.get('/api/application-reviews/count', getCount)
router.get('/api/application-reviews/average', getAverage)

router.get('/api/application-reviews', getApplicationReviews) 
router.get('/api/application-reviews/:id', getApplicationReview)
router.post('/api/application-reviews',addApplicationReview)
router.delete('/api/application-reviews/:id', deleteApplicationReview)

router.get('/api/application-reviews/rating', getRating)

//routes for customer reviews
router.get('/api/customer-reviews', getCustomerReviews)
router.get('/api/customer-reviews/:id', getCustomerReview)
router.post('api/customer-reviews', addCustomerReview)
router.delete('/api/customer-reviews/:id', deleteCustomerReview)

router.get('/api/customer-reviews/customer/:id', getSpecificCustomerReviews)
router.get('/api/customer-reviews/rating/:id', getRating)

//routes for customer reports 
router.get('/api/customer-reports', getCustomerReports)
router.post('/api/customer-reports', addCustomerReport)

export default router