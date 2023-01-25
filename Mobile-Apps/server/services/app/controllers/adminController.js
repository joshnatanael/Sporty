// const { comparePassword } = require('../helpers/bcrypt');
const { Category, Product, Image, sequelize } = require('../models');

class adminController {
  static async fetchProducts(req, res, next) {
    try {
      const products = await Product.findAll(
        { include: [Category, Image] }
      );
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
      const id = req.params.id;
      const product = await Product.findOne({
        where: {
          id
        },
        include: [Category, Image ]
      });
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async fetchCategoryDetail(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, imgUrl, authorId, idMongo } = req.body;
      const newProduct = await Product.create({ name, description, price, slug: "slug", mainImg, categoryId, authorId, idMongo }, { transaction: t });
      if (imgUrl[0].imgUrl) {
        await Image.bulkCreate(imgUrl.map(el=>{
          el.productId = newProduct.id;
          return el;
        }), { validate: true, transaction: t })
      }
      await t.commit();
      res.status(201).json(newProduct)
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id, name, description, price, mainImg, categoryId, imgUrl } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
        throw ("notFound");
      }
      await Product.update({ name, description, price, slug: name.toLowerCase().split(" ").join("-"), mainImg, categoryId },
        {
          where: {
            id
          },
          transaction: t
        });
      await Image.bulkCreate(imgUrl, { validate: true, updateOnDuplicate: ["imgUrl"] })
      await t.commit();
      res.status(201).json({message: `Product id ${product.id} successfully updated`})
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (!product) {
        throw ("notFound");
      }
      await Product.destroy({
        where: {
          id
        }
      })
      res.status(200).json({message: `${product.name} successfully deleted`});
    } catch (error) {
      next(error);
    }
  }
  static async addCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, imgUrl } = req.body;
      const newCategory = await Category.create({ name, imgUrl },
        { transaction: t });
      await t.commit();
      res.status(201).json(newCategory);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) {
        throw ("notFound");
      }
      const { name, imgUrl } = req.body;
      await Category.update({ name, imgUrl },
        {
          where: {
            id
          },
          transaction: t
        });
      await t.commit();
      res.status(201).json({message: `Category id ${category.id} successfully updated`})
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id);
      if (!category) {
        throw ("notFound");
      }
      await Category.destroy({
        where: {
          id
        }
      })
      res.status(200).json({message: `${category.name} successfully deleted`});
    } catch (error) {
      next(error);
    }
  }
  static async deleteProductsByIdMongo(req, res, next){
    try {
      const idMongo = req.params.idMongo;
      await Product.destroy({
        where: {
          idMongo
        }
      })
      res.status(200).json({message: `Successfully delete all associated product to user id ${idMongo}`});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = adminController;