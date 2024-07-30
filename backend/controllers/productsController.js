const Product = require('../models/productsModel')
const Constants = require('../models/constantsModel')

// const getProductsWithPage = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.send(products);
//     } catch (error) {
//         console.log(error)
//     }

// }

const getConstants = async () => {
  try {
    return await Constants.find();
  } catch (error) {
    console.log("Error Fetching constants: ", error)
  }
}
const getConstantsForApi = async (req, res) => {
  try {
    const constants = await Constants.find();
    res.send(constants)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getProducts = async (req, res,next) => {


  const { pageSize = 10, page = 1, order = 'des', sortWith = 'rating' } = req.query;
  const categoryString = req.query.categories
  let categories = []
  if (categoryString) {
    const decodeString = decodeURIComponent(categoryString);
    categories = JSON.parse(decodeString);
  }
  const priceRange = req.query.priceRange || 'All';

  const priceFilter = priceRange === 'All' ? { $gte: 0 } : { $gte: Number(priceRange.split('-')[0]), $lte: Number(priceRange.split('-')[1]) };

  const matchStage = {
    $match: {
      ...(categories.length > 0 ? { category: { $in: categories } } : {}),
      price: priceFilter,
    }
  };

  const sortStage = {
    $sort: sortWith === 'rating' ? { rating: order === 'des' ? -1 : 1 } : { price: order === 'des' ? -1 : 1 }
  };

  const skipStage = { $skip: (page - 1) * Number(pageSize) };
  const limitStage = { $limit: Number(pageSize) };

  const aggregationPipeline = [
    matchStage,
    sortStage,
    skipStage,
    limitStage
  ];

  try {
    const products = await Product.aggregate(aggregationPipeline);
    console.log(products.length);
    res.send(products);
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error)
  }

};


const getSingleProduct = async (req, res,next) => {
  try {
    const products = await Product.findById(req.params.id);
    res.send(products);
  } catch (error) {
    // console.log(error)
    next(error)
    // res.status(500).json({error: error.message})
  }

}

module.exports = { getSingleProduct, getProducts, getConstantsForApi }