// require local utils
var utils = require('./utils');

// require tests
var tests = require('./tests');

// express init code from codementor.io
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

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

app.use(function (req, res, next){
  // Allow client side to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  next();
});

app.get('/getUserData', function(request, response){
  // query concatenated for readability
  con.query('SELECT u.UserId, Username, UserFirstName, UserLastName, Income, PledgeAmount from User u ' +
             'JOIN UserIncome ui on u.UserId = ui.UserId ' +
             'JOIN UserPledge up on u.UserId = up.UserId ' +
             'WHERE ui.IsCurrent = 1 AND u.IsActive = 1 AND u.UserId = ' + request.query.id, function(error, results){
               if ( error ){
                   response.status(400).send('Error in database operation.');
               } else {
                   // convert to string to get rid of 'rowdatapacket' classification confusing json.parse
                   var stringResults = JSON.stringify(results);

                   var jsonResults = JSON.parse(stringResults);

                   // if jsonResults is empty, some user data was missing.
                   // POTENTIAL ISSUE: if a user does not have any active income records, this will filter them out.
                   if(jsonResults.length == 0)
                   {
                     response.status(404).send('Active user not found.');
                   }

                   var processedResults = jsonResults[0];

                   // get donation data - once it's received, send the response.
                   getDonationData(processedResults, response, function(userResultWithDonations, responseObject)
                   {
                     console.log(userResultWithDonations);
                     responseObject.send(userResultWithDonations);
                   });
               }
             });
});

//Run tests
var pwTest = tests.passwordTest();

function getDonationData(userInfo, responseObject, callback)
{
  con.query('SELECT Amount, DonatedDate, DonationOrg from UserDonation WHERE UserId = ' + userInfo.UserId, function(error, results){
      if ( error ){
          // if something went wrong, do not return any donations, but do continue the process of returning other user data.
          userInfo.Donations = [];

          callback(userInfo, responseObject);
      } else {
          // convert to string to get rid of 'rowdatapacket' classification confusing json.parse
          var stringResults = JSON.stringify(results);
          var processedDonationResults = JSON.parse(stringResults);

          for (var i = 0; i < processedDonationResults.length; i++)
          {
            // convert each datestring into a shorter, more readable datestring
            processedDonationResults[i].DonatedDate = utils.convertDate(processedDonationResults[i].DonatedDate);
          }

          // add donations property to the user info with the relevant data
          userInfo.Donations = processedDonationResults;

          callback(userInfo, responseObject);
      }
  });
}

app.get('/getDonationsByUserId', function(request, response){
  con.query('SELECT Amount, DonatedDate, DonationOrg from UserDonation WHERE UserId = ' + request.query.id, function(error, results){
      if ( error ){
          response.status(400).send('Error in database operation');
      } else {
          response.send(results);
      }
  });
});

app.listen(port, function(){
  console.log("Express server is listening on port " + port);
});
