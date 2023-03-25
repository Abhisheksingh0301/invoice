var express = require('express');
const session = require('express-session');
var mysql = require('../connection').con;
var constring = require('../connection').constring;
var sqlsvr = require('msnodesqlv8');
// var sqlsvr = require('../connection').constring;
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.redirect("users/login", {session:req.session});
  res.locals.uid = req.session;
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
  res.redirect("/");
});
router.post('/view', function (req, res, next) {
  res.locals.uid = req.session;
  console.log("in view");
  var itm = new Array();
  var desc = new Array();
  var rt = new Array();

  itm = req.body.item;
  desc = req.body.description;
  rt = req.body.rate;
  // console.log(req.body.item);
  // console.log(req.body.description);
  console.log(itm[0]);
  console.log(desc[0]);
  console.log(rt[0]);
  console.log(req.body);
  res.send(req.body);
});

router.get('/newquote', (req, res) => {
  console.log("sessionid", req.session.user_id);
  if (!req.session.user_id) {
    console.log("not logged in");
    res.redirect("/");
  } else {
    res.locals.uid = req.session;
    res.render("newquote", { session: req.session });
  }
})

module.exports = router;
