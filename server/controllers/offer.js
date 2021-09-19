'use strict' 

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connection = import(__dirname + '/../db.js')

export function getOffers(req,res) {
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

export function getOffer(req,res) {
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

export function getOfferBuying(req,res) {
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

export function getOfferSelling(req,res) {
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


export function addOffer(req,res) {
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

export function declineOffer(req,res) {
    var offer = {
		status : "Declined"
    }
    connection.query('UPDATE Offer SET status = ? where offer_id = ?', [offer.status,req.params.id], function(err, rows, fields) {
		if (!err) {
		    res.send(null)
		    console.log("Offer declined") 
		}
		else {
		    res.send(err)
		    console.log("Error in declining offer " + err)
		}
    }) 
}

export function acceptOffer(req,res) {
    var offer = {
		status : "Accepted"
    }
    connection.query('UPDATE Offer SET status = ? where offer_id = ?', [offer.status,req.params.id], function(err, rows, fields) {
        if (!err) {
            res.send(null)
            console.log("Offer accepted")
        }
        else {
            res.send(err)
            console.log("Error in accepting offer " + err)
        }
    })
}

export function deleteOffer(req,res) {
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

