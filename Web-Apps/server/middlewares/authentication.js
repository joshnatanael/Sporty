const { decodeToken } = require('../helpers/jwt');
const {User} = require('../models');

async function authentication(req, res, next){
  try {
    const token = req.headers.access_token;
    const payload = decodeToken(token);
    const user = await User.findByPk(payload.id);
    if(!user){
      throw("invalidToken")
    }
    req.user = {
      id: user.id,
      email: user.email
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;