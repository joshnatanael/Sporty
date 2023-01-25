const axios = require('axios');
const redis = require('../helpers/redis');

class Controller{
  static baseUrl(services){
    if(services === 'users'){
      return 'http://localhost:4001/';
    }
    return 'http://localhost:4002/';
  }
  static async findAllUsers(req, res, next){
    try {
      const usersCache = await redis.get("usersCache");
      if(usersCache){
        return res.status(200).json(JSON.parse(usersCache));
      }
      const {data} = await axios.get(`${Controller.baseUrl("users")}users`);
      await redis.set("usersCache", JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async registerUser(req, res, next){
    try {
      const {username, email, role, phoneNumber, password, address} = req.body;
      const {data} = await axios({
        method: "POST",
        url: `${Controller.baseUrl("users")}users`,
        data: {username, email, role, phoneNumber, password, address}
      });
      await redis.del("usersCache");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next){
    try {
      const id = req.params.id;
      const {username, email, role, phoneNumber, password, address} = req.body;
      const {data} = await axios({
        method: "PUT",
        url: `${Controller.baseUrl("users")}users/${id}`,
        data: {username, email, role, phoneNumber, password, address}
      })
      await redis.del("usersCache");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next){
    try {
      const id = req.params.id;
      const {data} = await axios({
        method: "DELETE",
        url: `${Controller.baseUrl("users")}users/${id}`
      })
      await axios({
        method: "DELETE",
        url: `${Controller.baseUrl("products")}admins/products/users/${id}`
      })
      await redis.del("usersCache");
      await redis.del("productsCache");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async findAllProducts(req, res, next){
    try {
      const productsCache = await redis.get("productsCache");
      if(productsCache){
        return res.status(200).json(JSON.parse(productsCache));  
      }
      const {data} = await axios.get(`${Controller.baseUrl("products")}customers/products`);
      await redis.set("productsCache", JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async findProductBySlug(req, res, next){
    try {
      const slug = req.params.slug;
      const {data: product} = await axios.get(`${Controller.baseUrl("products")}customers/products/${slug}`);
      const {data: user} = await axios.get(`${Controller.baseUrl("users")}users/${product.idMongo}`);
      delete user.password;
      product.User = user;
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async addProduct(req, res, next){
    try {
      const { name, description, price, mainImg, categoryId, imgUrl, idMongo, authorId } = req.body;
      const {data} = await axios({
        method: "POST",
        url: `${Controller.baseUrl("products")}admins/products`,
        data: { name, description, price, mainImg, categoryId, imgUrl, authorId, idMongo }
      })
      await redis.del("productsCache");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next){
    try {
      const id = req.params.id;
      const { name, description, price, mainImg, categoryId, imgUrl } = req.body;
      const {data} = await axios({
        method: "PUT",
        url: `${Controller.baseUrl("products")}admins/products`,
        data: { id, name, description, price, mainImg, categoryId, imgUrl }
      })
      await redis.del("productsCache");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next){
    try {
      const id = +req.params.id;
      const {data} = await axios({
        method: "DELETE",
        url: `${Controller.baseUrl("products")}admins/products/${id}`
      })
      await redis.del("productsCache");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;