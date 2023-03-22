var express = require('express');
const session = require('express-session');
var sqlsvr = require('msnodesqlv8');
const { response } = require('../app');
const constring = "server=.;Database=Exam;Trusted_connection=Yes;Driver={SQL Server Native Client 11.0}";
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
   res.send('respond with a resource');
  // res.redirect("users/login", {session:req.session});
  //res.render("login", { session: req.session });
});



module.exports = router;
