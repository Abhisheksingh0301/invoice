var express = require('express');
var mysql = require('../connection').con;

var sqlsvr = require('msnodesqlv8');
// var sqlsvr = require('../connection').constring;
const constring = "server=.;Database=Exam;Trusted_connection=Yes;Driver={SQL Server Native Client 11.0}";
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  // res.redirect("users/login", {session:req.session});
  res.render("login", { session: req.session });
});

router.get('/show', function (req, res, next) {
  const query = "select * from dbo.REVIEW_02 where sessn='Dec, 2022'";
  sqlsvr.query(constring, query, (err, rows) => {
    console.log(rows);
    //res.send(JSON.stringify(rows));
    res.send(rows);
  })

})
router.post('/login', function (req, res, next) {
  var user_name = req.body.user_name;
  var user_password = req.body.user_password;
  if (user_name && user_password) {
    var query = `select * from [dbo].[Login_Table] where [user_id]='${user_name}'`;
    // var query = "select * from [dbo].[Login_Table] where [user]='Admin'";
    console.log(query);
    sqlsvr.query(constring, query, function (err, data) {
      console.log(data.length);

      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          console.log(data[count].Password + "  " + user_password);

          if (data[count].Password == user_password) {
            req.session.user_id = data[count].user_id;
            console.log(req.session.user_id);
            console.log(data[count].user_id);
            // console.log("success");
            //res.render("login", { session: req.session });
            return res.redirect("/");
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