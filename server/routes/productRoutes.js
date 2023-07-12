

const  express = require('express');
const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,updateProduct, searchProduct
} = require('../controllers/productController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
const multer = require('multer');

//Image upload
const upload = multer({ dest: 'uploads/' });


//router.use(requireAuth)


router.get('/',getProducts);

router.get('/:id',getProduct);


router.post('/',upload.single('image'), createProduct);




router.delete('/:id',deleteProduct);

router.patch('/:id',updateProduct);

router.get('/s',searchProduct);



module.exports = router
