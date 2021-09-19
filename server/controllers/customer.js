'use strict' 

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connection = import(__dirname + '/../db.js')

export function getCustomers(req,res) {
    connection.query('SELECT * FROM Customer', [], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all customers")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all customers " + err) 
		}
    })
}

export function getCustomer(req,res) {
    connection.query('SELECT * FROM Customer where customer_id =?', [req.params.id], function(err, rows, fields) {
    	if (!err) {
		    res.send(rows[0])
		    console.log("Retrieved customer")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving customer " + err)
		}
    })
}

export function getCustomerByEmail(req, res) {
    connection.query('SELECT * FROM Customer WHERE email = ?', [req.params.email], function(err,rows,fields) {
		if (!err) {
		    res.send(rows[0])
		    console.log("Retrieved customer by email ")
		}
		else {
		    res.send(err)
		    console.log("Error retrieving customer by email " + err)
		}
    })
}

export function addCustomer(req,res) {
    var customer = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
		email : req.body.email
    }
    connection.query('INSERT INTO Customer SET ?', customer, function(err, rows, fields) {
		if (!err) {
	    	customer.customer_id = rows.insertId
            res.send(customer)
	    	console.log("Added new customer")
		}
		else {
		    res.send(err)
		    console.log("Error in adding new customer " + err)
		}
    })
}

export function updateCustomer(req,res) {
    var customer = {
		customer_id : req.params.id,
		address : req.body.address, 
		contact_no : req.body.contact_no
    }
    connection.query('UPDATE Customer SET address = ?, contact_no = ? where customer_id = ?', [req.body.address, req.body.contact_no, req.params.id], function(err, rows, fields) {
        if (!err) {
		    res.send(customer)
	  	    console.log("Updated Customer") 
		} 
        else {
		    console.log("Error in updating customer " + err)
		    res.send(err)
		}
    })
}

export function getCustomerItems(req,res) {
    connection.query('SELECT * FROM Item where customer_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all items from customer")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving items from customer " + err)
		}
    })
}

export function searchCustomerItems(req, res) {
    connection.query('SELECT * FROM Item WHERE Name LIKE ?', ['%' + req.params.search + '%'], function(err, rows, fields) {
		if (!err) {
		    res.send(rows) 
		    console.log("Searched for items from customer")
		}
		else {
		    res.send(err)
		    console.log("Error in searching for items from customer " + err) 
		}
    })
}
