const express = require('express');
const {getProducts,getSingleProduct,getConstantsForApi} =require('../controllers/productsController')
const tokenAuth =require('../middlewares/tokenAuth')

const router = express.Router();
router.use(tokenAuth)

router.get('/constants',getConstantsForApi)

router.get('/',getProducts);
// router.get('/page/:page',getProductsWithPage);
router.get('/:id',getSingleProduct);

//get constants

module.exports=router