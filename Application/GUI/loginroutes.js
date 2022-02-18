//put this file in /server/routes
var jsonfile = require('jsonfile');
exports.login = function (req, res) {
  console.log("Input request->" + req.body);
  var userid = req.body.username;
  var password = req.body.password;
  console.log('userid->' + userid + ' pass->' + password)
  var results = 'abc';
  if (results.length > 0) {
    //if(results[0].password == req.body.password){
    if (password == 'ABC123') {

      //if(results[0].role == req.body.role){
      if (userid != '') {
        var file = './userdata/userid.json'
        var obj = { userid: req.body.userid }
        jsonfile.writeFile(file, obj, function (err) {
          if (err) {
            console.log("Error ocurred in writing json during login at login handler in login routes", err);
          }
        })
        res.send({
          "code": 200,
          "success": "login sucessfull"
        })
      }
      else {
        res.send({
          "code": 204,
          "success": "You have logged in from wrong user role"
        })
      }

    }
    else {
      res.send({
        "code": 204,
        "success": "Email and password does not match"
      })
    }

  }
  else {
    res.send({
      "code": 204,
      "success": "Email does not exits"
    });
  }


}