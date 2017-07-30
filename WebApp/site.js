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
    Username: ko.observable(""),
    NoDonations: ko.observable(false),
    IsUserSelected: ko.observable(false),
    ShowValidationMessage: ko.observable(false)
  };

  // custom handler to add commas, cents (when necessary), and dollar signs correctly to numeric fields
  ko.bindingHandlers.currency = {
    update: function(element, valueAccessor)
    {
      var value = ko.unwrap(valueAccessor());

      // helpful regex logic found on stackoverflow to add commas
      var formattedValue = "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // if we have a decimal point...
      if (formattedValue.split('.').length == 2)
      {
        var splitValue = formattedValue.split('.');

        var dollars = splitValue[0];
        var cents = splitValue[1];

        // if the cents length is one digit, we need to add a 0 - ie. 0.5 dollars is 50 cents.
        if (cents.length == 1)
        {
          cents = cents + "0";
        }
        // if the cents length is more than two digits, we need to truncate.
        else if (cents.length > 2)
        {
          cents = cents.substring(0, 2);
        }

        formattedValue = dollars + "." + cents;
      }

      $(element).html(formattedValue);
    }
  }

  ko.applyBindings(viewModel);

  $("#submitButton").on("click", function(){
    var username = $("#username").val();
    var password = $("#password").val();

    getUserData(username, password, viewModel);
  });

  $("#changeUser").on("click", function(){
    $("#username").val("");
    $("#password").val("");

    viewModel.IsUserSelected(false);
  });
});

// View model is passed in empty and updated with information from the server
function getUserData(username, password, viewModel) {
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function() {
        if ( xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 200 ) {
            // parse the response
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

            viewModel.NoDonations(viewModel.Donations().length == 0);
            // END generate computed properties

            // show the panel for the selected user
            viewModel.IsUserSelected(true);

            // hide validation message
            viewModel.ShowValidationMessage(false);
        }
        else if(xmlHttpRequest.readyState == XMLHttpRequest.DONE && xmlHttpRequest.status == 403 ) {
          viewModel.ShowValidationMessage(true);
        }
  }
  // NOTE: in general, it's very important to not send password through in a GET request as plaintext.
  // I have done so here because time is short, in order to include login functionality.
  // It would be a bad idea in production code. At the very least, this request should be switched to a POST.
  xmlHttpRequest.open('GET', 'http://localhost:3000/getUserData?username=' + username + '&password=' + password, true);
  xmlHttpRequest.send();
}
