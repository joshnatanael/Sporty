const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User, Category, Product, Image, sequelize } = require('../models');

class adminController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw ("noEmail")
      }
      if (!password) {
        throw ("noPassword")
      }
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        throw ("userNotFound")
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw ("invalidAccount")
      }
      res.status(200).json({
        access_token: generateToken({ id: user.id })
      })
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({ username, email, password, role: "Admin", phoneNumber, address },
        { transaction: t });
      await t.commit();
      res.status(201).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
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
        include: [Category, Image, {
          model: User,
          attributes: ["username", "email"]
        }]
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
      const { name, description, price, mainImg, categoryId, imgUrl } = req.body;
      const newProduct = await Product.create({ name, description, price, slug: "slug", mainImg, categoryId, authorId: req.user.id }, { transaction: t });
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
      await Product.update({ name, description, price, slug: name.toLowerCase().split(" ").join("-"), mainImg, categoryId, authorId: req.user.id },
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
}

module.exports = adminController;