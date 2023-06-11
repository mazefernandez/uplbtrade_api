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
    connection.query('SELECT tag_name FROM Tagmap where item_id = ?', [req.params.id], function(err, rows, fields) {
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
    var tags = req.body
    var values = []
    console.log(tags)
    for (let i=0; i<tags.length; i++) {
	values.push([tags[i].item_id, tags[i].tag_name])
    }
    console.log(values)
    connection.query("INSERT INTO Tagmap(item_id, tag_name) VALUES ?", [values], function(err, rows, fields) {
        if (!err) {
	    console.log("Added new tagmap")
            res.send(rows)
	 }
        else {
	    console.log("Error in adding new tagmap " + err)
        }
    })
}

exports.deleteTags = (req,res) => {
    connection.query('DELETE from Tagmap where item_id = ?', [req.params.id], function(err, rows, fields) {
        if (!err) {
	    console.log("Deleted Tagmaps")
	    res.send(null)
	}
	else {
	    res.send(err)
	    console.log("Error in deleting Tagmaps")
	}
    })
}
