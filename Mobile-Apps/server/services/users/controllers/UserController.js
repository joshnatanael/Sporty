const { hashPassword } = require('../helpers/bcrypt');
const UserModel = require('../models/User');

class UserController {
  static async register(req, res, next) {
    try {
      const data = req.body;
      if(!data.email){
        throw ("noEmail");
      }
      if(!data.password){
        throw ("noPassword");
      }
      if(data.password.length < 5){
        throw ("passwordShort");
      }
      data.password = hashPassword(data.password);
      const newUser = await UserModel.register(data);
      res.status(201).json({ message: `A document was inserted with the _id: ${newUser.insertedId}` });
    } catch (error) {
      next(error);
    }
  }
  static async findUser(req, res, next) {
    try {
      const users = await UserModel.findUser();

      res.status(200).json(users.map(user => {
        delete user.password;
        return user
      }));
    } catch (error) {
      next(error);
    }
  }
  static async findUserById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await UserModel.findUserById(id);

      if (!user) {
        throw ("noUser");
      }
      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const deleteStatus = await UserModel.deleteUser(id);
      if (deleteStatus.deletedCount !== 1) {
        throw("noUser");
      }
      res.status(200).json({message: "Successfully deleted one document."});
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      if(!data.email){
        throw ("noEmail");
      }
      if(data.password){
        data.password = hashPassword(data.password);
      }
      const updatedUser = await UserModel.editUser(id, data);
      res.status(200).json({message: `Successfully update user with id ${id}`});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;