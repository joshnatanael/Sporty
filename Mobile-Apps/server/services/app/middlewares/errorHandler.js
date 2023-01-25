function errorHandler (err, req, res, next) {console.log(err);
  let code = 500;
  let message = "Internal server error";
  if(err.name === "SequelizeValidationError"){
    code = 400;
    message = err.errors[0].message;
  }
  else if(err === "userNotFound" || err === "invalidAccount"){
    code = 400;
    message = "Invalid email or password";
  }
  else if(err === "noEmail"){
    code = 400;
    message = "Email is required";
  }
  else if(err === "noPassword"){
    code = 400;
    message = "Password is required";
  }
  else if(err === "invalidToken" || err.name === "JsonWebTokenError"){
    code = 401;
    message = "Invalid Token";
  }
  else if(err === "notFound"){
    code = 404;
    message = "Data not found";
  }
  else if(err.name === "SequelizeUniqueConstraintError"){
    code = 400;
    message = err.errors[0].message;
  }
  res.status(code).json({message});
}

module.exports = errorHandler;