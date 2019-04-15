var multer = require('multer')
var shell = require('shelljs')
var path = require('path')

var imagemin = require('imagemin')
var mozjpeg = require('imagemin-mozjpeg')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
    	cb(null,__dirname + '/../../client/images')
    },
    filename: function(req, file, cb) {
		cb(null, file.fieldname.toLowerCase() + '-' + (shell.ls(__dirname + '/../../client/images').length + 1) + path.extname(file.originalname))
    }
})

var upload = multer({ 
	storage: storage,
	limits: { fieldSize: 25 * 1024 * 1024}
})

exports.upload = (function(req, res, next) {
    return multer({ storage: storage })
})();
