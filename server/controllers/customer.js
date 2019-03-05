'use strict' 

const mysql = require('mysql')
const connection = require(__dirname + '/../db.js')

exports.addCustomer = (req,res) => {
    var customer = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
	email : req.body.email
    }
    connection.query('INSERT INTO Customer SET ?', customer, function(err, rows, fields) {
	if (!err) {
	    customer.customer_id = rows.insertId
            res.send(customer)
	    console.log("Added new Customer")
	}
	else {
	    console.log("Error in adding new customer " + err)
	    res.send(err)
	}
    })
}

exports.updateCustomer = (req,res) => {
    var customer = {
	customer_id : req.params.id,
	address : req.body.address, 
	contact_no : req.body.contact_no, 
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
