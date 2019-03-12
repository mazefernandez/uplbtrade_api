'use strict' 

const mysql = require('mysql') 
const connection = require(__dirname + '/../db.js')

exports.getOffers = (req,res) => {
    connection.query('SELECT * FROM Offer', [], function (err, rows, fields) {
	if (!err) {
	    res.send(rows)
	    console.log("Retrieved all offers") 
	}
	else {
	    res.send(err)
	    console.log("Error in retrieving all offers " + err)
	}
    })
}

exports.getOffer = (req,res) => {
    connection.query('SELECT * FROM Offer where offer_id = ?', [req.params.id], function(err, rows, fields) {
    	if (!err) {
	    res.send(rows[0])
	    console.log("Retrieved offer")
   	 }
    	else {
	    res.send(err)
	    console.log("Error in retrieving offer") 
    	}
    })
}

exports.getOfferBuying = (req,res) => {
    connection.query('SELECT * FROM Offer WHERE buyer_id = ?', [req.params.id], function(err, rows, fiekds) {
	if (!err) {
	    res.send(rows) 
	    console.log("Retrieved offers for buyer") 
	}
	else {
	    res.send(err) 
	    console.log("Error in retrieving offers for buyer" + err)
	} 
    })
} 

exports.getOfferSelling = (req,res) => {
    connection.query('SELECT * FROM Offer WHERE seller_id = ?', [req.params.id], function(err, rows, fiekds) {
        if (!err) {
            res.send(rows)
            console.log("Retrieved offers for seller")
        }
        else {
            res.send(err)
            console.log("Error in retrieving offers for seller" + err)
        }
    })
}


exports.addOffer = (req,res) => {
    var offer = {
	price : req.body.price, 
	status : req.body.status,
        message : req.body.message, 
	item_id : req.body.item_id,
	buyer_id : req.body.buyer_id,
	seller_id : req.body.seller_id 
    }
    connection.query('INSERT INTO Offer SET ?', offer, function(err, rows, fields) {
        if (!err) {
	    offer.offer_id = rows.insertId
	    res.send(offer)
	    console.log("Added new offer")
	}
	else {
	    res.send(err)
	    console.log("Error in adding new offer " + err)
	}
    }) 
}	    

exports.deleteOffer = (req,res) => {
    connection.query('DELETE FROM Offer WHERE offer_id = ?', [req.params.id], function(err, rows, fields) {
	if (!err) {
	    res.send(null)
	    console.log("Deleted offer")
	}
	else {
	    res.send(err)
	    console.log("Error in deleting offer " + err) 
	}
    })
}

