function errorHandler(err, req, res, next){console.log(err);
  let code = 500;
  let message = "Internal Server Error";
  if(err === "noUser"){
    code = 404;
    message = "Data not found";
  }
  else if(err === "noEmail"){
    code = 400;
    message = "Email is required";
  }
  else if(err === "noPassword"){
    code = 400;
    message = "Password is required";
  }
  else if(err === "passwordShort"){
    code = 400;
    message = "Password must be 5 characters or longer";
  }
  res.status(code).json({message})
}

module.exports = errorHandler;