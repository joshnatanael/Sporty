'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId"
      });
      Product.hasMany(models.Image, {
        foreignKey: 'productId'
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product name is required'
        },
        notEmpty: {
          msg: 'Product name is required'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product slug is required'
        },
        notEmpty: {
          msg: 'Product slug is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product description is required'
        },
        notEmpty: {
          msg: 'Product description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price is required'
        },
        notEmpty: {
          msg: 'Price is required'
        },
        min: {
          args: 50000,
          msg: "Price must be higher than IDR 50.000"
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product main image is required'
        },
        notEmpty: {
          msg: 'Product main image is required'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category is required'
        },
        notEmpty: {
          msg: 'Category is required'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Author is required'
        },
        notEmpty: {
          msg: 'Author is required'
        }
      }
    },
    idMongo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeCreate((instance, options) => {
    instance.slug = instance.name.toLowerCase().split(" ").join("-");
  });
  return Product;
};