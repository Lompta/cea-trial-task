// express init code from codementor.io
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('RESTful API server started on: ' + port);

//var knex = require('knex')({
//  client: 'mysql',
//  connection: {
//    host: 'localhost',
//    user: "cea_trial_user",
//    password: "Jalak8uWest",
//    database: "cea_trial_task"
//  }
//});

//knex.select().from('User').timeout(1000);

console.log('testing 123');

var mysql = require('mysql');

// Set up connection.
var con = mysql.createConnection({
  host: "localhost",
  user: "cea_trial_user",
  password: "Jalak8uWest",
  database: "cea_trial_task"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected as cea_trial_user!");
});

function getUserById(id){
  con.query('SELECT * from User WHERE UserId=' + id, function (err, result) {
    if (err) throw err;
    console.log(result[0].UserFirstName);
    return result;
  });
}

getUserById(1);
