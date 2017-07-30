// Since password functionality is not implemented, this test exists to make sure that the passwords are
// correctly stored in the database.

module.exports.passwordTest = function(){
  // Require mysql
  var mysql = require('mysql');

  // Require local utils
  var utils = require('./utils');

  // Require password hashing and salting package
  var hasher = require('password-hash-and-salt');

  // Set up  and test connection.
  var con = mysql.createConnection({
    host: "localhost",
    user: "cea_trial_user",
    password: "Jalak8uWest",
    database: "cea_trial_task"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected as cea_trial_user for password tests!");
  });

  // set universal components of hashes
  var encodingStyle = "pbkdf2";
  var iterations = "10000";

  // test peter singer's password to verify system working properly
  // NOTE - would never use a real user's password in a test like this. Only doing it because P Singer is a dummy user here

  //var singerPassword = "ExpensiveSuit1";
  var singerPassword = "Bl00d0fTheY0ung";

  con.query('SELECT PasswordHashed, Salt from User WHERE UserId = 2', function(error, results){
       if ( error ){
         response.status(400).send('Error in database operation.');
       } else {
         var data = results[0];
         var singerHash = encodingStyle + "$" + iterations + "$" + data.PasswordHashed + "$" + data.Salt;
         // Test that correct password works
         hasher(singerPassword).verifyAgainst(singerHash, function(error, verified) {
            if(error)
                throw new Error('Error in password verifying!');
            if(!verified) {
                console.log("Peter Singer's correct password did not work.");
            } else {
                console.log("Peter Singer's correct password did work!");
            }
          });

          // Test that incorrect password fails
          hasher("make-a-wish").verifyAgainst(singerHash, function(error, verified) {
             if(error)
                 throw new Error('Error in password verifying!');
             if(!verified) {
                 console.log("Peter Singer's account was successfully protected against a hack.");
             } else {
                 console.log("Peter Singer's account got hacked. Catastrophe!");
             }
           });
       }
    });
  }
