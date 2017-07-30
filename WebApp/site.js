$(document).ready(function(){
  var viewModel = {
    DonationGoalMet: ko.observable(true),
    DonationShortfall: ko.observable(0.00),
    Donations: ko.observable([]),
    DonationsTotal: ko.observable(0.00),
    Income: ko.observable(0.00),
    PledgeAmount: ko.observable(0.00),
    RequiredDonationAmount: ko.observable(0.00),
    UserFirstName: ko.observable(""),
    UserId: ko.observable(0),
    UserLastName: ko.observable(""),
    Username: ko.observable("")
  };

  // custom handler to add commas correctly to numeric fields
  ko.bindingHandlers.currency = {
    update: function(element, valueAccessor)
    {
      // helpful regex logic found on stackoverflow
      var value = ko.unwrap(valueAccessor());
      console.log(value);

      var formattedValue = "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      $(element).html(formattedValue);
    }
  }

  ko.applyBindings(viewModel);

  // start with peter singer by default
  getUserData(1, viewModel);

  $("#userSelect").on("change", function(){
    getUserData($(this).val(), viewModel);
  });
});

function getUserData(id, viewModel) {
    console.log("attempting get user data");
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function() {
        if ( xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200 ) {
            // our request returns a list of matching users. we want the first, which should be the only user
            var responseObject = JSON.parse(xmlHttpRequest.responseText);

            // BEGIN set raw observables
            viewModel.Donations(responseObject.Donations);
            viewModel.Income(responseObject.Income);
            viewModel.PledgeAmount(responseObject.PledgeAmount);
            viewModel.UserFirstName(responseObject.UserFirstName);
            viewModel.UserLastName(responseObject.UserLastName);
            viewModel.UserId(responseObject.UserId);
            viewModel.Username(responseObject.Username);
            // END set raw observables

            // BEGIN generate computed properties
            var donationsTotalTemp = 0.0;
            for (var i = 0; i < viewModel.Donations().length; i++)
            {
              donationsTotalTemp += viewModel.Donations()[i].Amount;
            }

            viewModel.DonationsTotal(donationsTotalTemp);

            // divide by 100.0 rather than by 100 to convert to decimal and avoid a floor function division operation
            viewModel.RequiredDonationAmount((viewModel.Income() * viewModel.PledgeAmount()) / 100.0);

            viewModel.DonationShortfall(viewModel.RequiredDonationAmount() - viewModel.DonationsTotal());

            viewModel.DonationGoalMet(viewModel.DonationShortfall() <= 0);
            // END generate computed properties

            console.log("here's the updated view model");
            console.log(viewModel);
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
