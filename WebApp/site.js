

$(document).ready(function(){
  var viewModel = getUserById(1);

  ko.applyBindings(viewModel);
});
