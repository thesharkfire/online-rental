

const  express = require('express');
const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,updateProduct, searchProduct
} = require('../controllers/productController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
const path = require('path');

const multer = require('multer');

//Image upload
// Set up multer with local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


//router.use(requireAuth)


router.get('/',getProducts);

router.get('/:id',getProduct);


router.post('/', upload.single('image'), createProduct);




router.delete('/:id',deleteProduct);

router.patch('/:id',updateProduct);

router.post('/search', searchProduct);



module.exports = router
