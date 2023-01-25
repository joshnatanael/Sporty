const { ObjectId } = require('mongodb');
const { getDb } = require('../config/mongoConnect');
const { hashPassword } = require('../helpers/bcrypt');

class UserModel{
  static getCollection(){
    const collection = getDb().collection("users");
    return collection;
  }
  static async register(data){
    try {
      const {username, email, password, role, phoneNumber, address} = data;
      const collection = this.getCollection();
      const newUser = await collection.insertOne({username, email, password: hashPassword(password), role, phoneNumber, address});
      return newUser;
    } catch (error) {
      throw error
    }
  }
  static async findUser(){
    try {
      const collection = this.getCollection();
      const users = await collection.find().toArray();

      return users;
    } catch (error) {
      throw error
    }
  }
  static async findUserById(id){
    try {
      const collection = this.getCollection();
      const user = await collection.findOne({_id: ObjectId(id)});

      return user;
    } catch (error) {
      throw error
    }
  }
  static async deleteUser(id){
    try {
      const collection = this.getCollection();
      const deleteStatus = await collection.deleteOne({_id: ObjectId(id)});
      return deleteStatus
    } catch (error) {
      throw error
    }
  }
  static async editUser(id, data){
    try {
      const {username, email, password, role, phoneNumber, address} = data;
      const collection = this.getCollection();
      const updatedUser = await collection.updateOne({_id: ObjectId(id)}, {$set: {username, email, password: hashPassword(password), role, phoneNumber, address}});
      return updatedUser;
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserModel;