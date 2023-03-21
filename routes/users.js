var express = require('express');
const session = require('express-session');
var sqlsvr = require('msnodesqlv8');
const { response } = require('../app');
const constring = "server=.;Database=Exam;Trusted_connection=Yes;Driver={SQL Server Native Client 11.0}";
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  // res.redirect("users/login", {session:req.session});
  res.render("login", { session: req.session });
});

router.post('/login', function (req, res, next) {
  var user_name = req.body.user_name;
  var user_password = req.body.user_password;
  if (user_name && user_password) {
    var query = `select * from [dbo].[Login_Table] where [user]='${user_name}'`;
    // var query = "select * from [dbo].[Login_Table] where [user]='Admin'";
    console.log(query);
    sqlsvr.query(constring, query, function (err, data) {
      console.log(data.length);
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          console.log(data[count].Password +"  "+ user_password);
          if (data[count].Password == user_password) {
            // console.log("correct user and password22222222222");
            // req.session.user_id = data[count].user;
            // res.redirect("/");
            console.log("success");
            res.send("Sucess");
          } else {
            res.send("Incorrect password");
          }
        }
      } else {
        res.send("Incorrect userid");
      }
    })
  } else {
    res.send("User or Password cannot be blank");
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect();
});


module.exports = router;
