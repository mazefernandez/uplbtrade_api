'use strict' 

const connection = require(__dirname + '/../db.js')

exports.getTags = (req,res) => {
    connection.query('SELECT * FROM Tag', [], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all tags")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all tags" + err) 
		}
    })
}

exports.getTagsFromItem = (req,res) => {
    connection.query('SELECT Tag.tag_name FROM Tag INNER JOIN Tagmap ON Tag.tag_id = Tagmap.tag_id where Tagmap.item_id = ?', [req.params.id], function(err, rows, fields) {
		if (!err) {
		    res.send(rows)
		    console.log("Retrieved all tags from item")
		}
		else {
		    res.send(err)
		    console.log("Error in retrieving all tags from item " + err) 
		}
    })
}

exports.addTags = (req,res) => {
    var tags = req.body;
    for (var i=0; i<tags.length; i++) {
		var tag = {tag_name : tags[i].tag_name}
		var tagmap = {item_id : tags[i].item_id}
		connection.query('INSERT IGNORE into Tag SET ?',tag, function(err, rows, fields) {
            if (!err) {
				tag.tag_id = rows.insertId
				tagmap.tag_id = rows.insertId
				console.log(tag)
				console.log(tagmap)
		    	console.log("Added new tag")
				connection.query('INSERT into Tagmap SET ?', tagmap, function(err, rows, fields) {
					if (!err) {
						tagmap.tagmap_id = rows.insertId
						console.log("Added new tagmap")
					}
					else {
						console.log("Error in adding new tagmap " + err)
					}
				})
            }
			else {
				console.log("Error in adding new tag " + err)
               }
           })
	}
}