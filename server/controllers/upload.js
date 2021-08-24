// upload to server 

import multer, { diskStorage } from 'multer'
import { ls } from 'shelljs'
import { extname } from 'path'

import imagemin from 'imagemin'
import mozjpeg from 'imagemin-mozjpeg'

// storage for images 
var storage = diskStorage({
    destination: function(req, file, cb) {
    	cb(null,__dirname + '/../../client/images')
    },
    // generate file name and destination
    filename: function(req, file, cb) {
		cb(null, file.fieldname.toLowerCase() + '-' + (ls(__dirname + '/../../client/images').length + 1) + extname(file.originalname))
    }
})

// set storage size and limit
var upload = multer({ 
	storage: storage,
	limits: { fieldSize: 25 * 1024 * 1024}
})

const _upload = (function (req, res, next) {
  return multer({ storage: storage })
})()
export { _upload as upload }
