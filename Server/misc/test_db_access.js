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

// Get users
con.query('SELECT * from User', function (err, result) {
  if (err) throw err;
  console.log(result);
});
