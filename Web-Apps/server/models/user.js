'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: 'authorId'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [5],
          msg: "Password must be 5 characters or longer"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};