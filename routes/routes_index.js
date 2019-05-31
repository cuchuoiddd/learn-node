const router = require('express').Router();

// import home controller
import Home from '../App/controllers/HomeController'

// import auth controller
import Auth from '../App/controllers/AuthController'

// upload image with multer
const multer = require('multer');

const multerConf = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(file)
            cb(null, './public/images')
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split('/')[1];
            cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    })
}
/* GET home page. */
router.get('/', Home.index)
      .post('/test', Home.test)
      .post('/upload-image', multer(multerConf).single('image'), Home.uploadImage)

export default router;
