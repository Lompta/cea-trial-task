module.exports.convertDate = function(rawDate)
{
  var dateObj = rawDate.split(/[- T]/);

  var refinedDate = parseInt(dateObj[1], 10) + "/" + parseInt(dateObj[2], 10) + "/" + dateObj[0];

  return refinedDate;
};

// this function is used to compute and log the hashes for the database for each user's chosen raw password
module.exports.hashAndSalt = function(password)
{
  console.log('attempting hash!');
  var hasher = require('password-hash-and-salt');

  hasher(password).hash(function(error, hash) {
    if (error)
    {
      throw new Error('Error saving password.');
    }

    // logs hash
    console.log(hash);
  });
}

// this function is used to validate a password
module.exports.validatePassword = function(userId, passwordAttempt, passwordHashed, salt, callback)
{
  var hasher = require('password-hash-and-salt');

  // set universal components of hashes
  var encodingStyle = "pbkdf2";
  var iterations = "10000";

  hash = encodingStyle + "$" + iterations + "$" + passwordHashed + "$" + salt;

  hasher(passwordAttempt).verifyAgainst(hash, function(error, verified){
    if(error)
      throw new Error('Error in password verifying!');
    if(!verified)
    {
      console.log('the password was wrong.');
      // the user with this id did not succeed in validating
      callback(userId, false);
    }
    else {
      // the user with this id is validated
      callback(userId, true);
    }
  });
}
