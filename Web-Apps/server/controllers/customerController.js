const {User, Product, Category, Image} = require('../models');

class customerController{
  static async fetchProducts(req, res, next) {
    try {
      const categoryName = req.query.categoryName;
      let category;
      let options = { include: [Category, Image] };
      if(categoryName){
        category = await Category.findOne({
          where: {
            name: categoryName
          }
        })
        if(!category){
          throw ("notFound");
        }
        options = {
          ...options,
          where: {
            categoryId: category.id
          }
        }
      }
      const products = await Product.findAll(options);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async fetchCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
  static async fetchProductDetail(req, res, next) {
    try {
      const slug = req.params.slug;
      const product = await Product.findOne({
        where: {
          slug
        },
        include: [Category, Image, {
          model: User,
          attributes: ["username", "email"]
        }]
      });
      if(!product){
        throw ("notFound");
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = customerController;