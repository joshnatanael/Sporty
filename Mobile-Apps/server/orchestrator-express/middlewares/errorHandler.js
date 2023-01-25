function errorHandler(err, req, res, next){
  let code = err.response.status;
  let message = err.response.data.message;
  res.status(code).json({message})
}

module.exports = errorHandler;