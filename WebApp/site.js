$(document).ready(function(){
  var viewModel = {};

  // custom handler to add commas correctly to numeric fields
  ko.bindingHandlers.currency = {
    init: function(element, valueAccessor)
    {
      var value = valueAccessor();

      // helpful regex logic found on stackoverflow
      var formattedValue = "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      $(element).html(formattedValue);
    }
  }

  // BEGIN stopgap measure pre-authentication:
  // in order to view different users, put a query string consisting only of their UserId
  // for example, to view the user with ID 2 on localhost port 8000, localhost:8000?2.
  // with no query string, the page defaults to user id 1's information.
  var location = window.location.href;
  var userId = location.split("?")[1];

  if(userId = undefined)
  {
    userId = "1";
  }
  // END stopgap measure pre-authentication.

  getUserData(userId, viewModel);
});

function getUserData(id, viewModel) {
    console.log("attempting get user data");
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function() {
        if ( xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200 ) {
            // our request returns a list of matching users. we want the first, which should be the only user
            var responseObject = JSON.parse(xmlHttpRequest.responseText);

            viewModel = responseObject;

            // BEGIN generate computed properties
            var donationsTotalTemp = 0.0;
            for (var i = 0; i < viewModel.Donations.length; i++)
            {
              donationsTotalTemp += viewModel.Donations[i].Amount;
            }

            viewModel.DonationsTotal = donationsTotalTemp;

            // divide by 100.0 rather than by 100 to convert to decimal and avoid a floor function division operation
            viewModel.RequiredDonationAmount = (viewModel.Income * viewModel.PledgeAmount) / 100.0;

            viewModel.DonationShortfall = viewModel.RequiredDonationAmount - viewModel.DonationsTotal;

            viewModel.DonationGoalMet = viewModel.DonationShortfall <= 0;
            // END generate computed properties

            console.log("here's the updated view model");
            console.log(viewModel);

            ko.applyBindings(viewModel);
        };
  }
  xmlHttpRequest.open('GET', 'http://localhost:3000/getUserData?id=' + id, true);
  xmlHttpRequest.send();
}

// THIS ISN'T DRY AND WILL BE REPLACED WITH A COMPOSITE FUNCTION
function getDonationsByUserId(id) {
    console.log("attempting get donations");
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function() {
        if ( xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200 ) {
            console.log(xmlHttpRequest.responseText);
        };
  }
  xmlHttpRequest.open('GET', 'http://localhost:3000/getDonationsByUserId?id=' + id, true);
  xmlHttpRequest.send();
}
