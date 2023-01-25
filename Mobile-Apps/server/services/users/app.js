if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const router = require('./routes');
const {mongoConnect} = require('./config/mongoConnect');
const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router);
app.use(errorHandler);

mongoConnect()
  .then(_=>{
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })