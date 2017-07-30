module.exports.convertDate = function(rawDate)
{
  var dateObj = rawDate.split(/[- T]/);

  var refinedDate = parseInt(dateObj[1], 10) + "/" + parseInt(dateObj[2], 10) + "/" + dateObj[0];

  return refinedDate;
};

// this function was used to obtain the hashes for the database for each user's chosen raw password
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
