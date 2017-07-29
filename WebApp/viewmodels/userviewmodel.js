// Gets a user's information by their ID (conditional on authentication - do this later).
function getUserById(id)
{
  return {
    userFirstName: ko.observable("Bobbery"),
    userLastName: ko.observable("Bombson"),
    pledgeAmount: ko.observable(10),
    incomeAmount: ko.observable(50000)
  }
}
