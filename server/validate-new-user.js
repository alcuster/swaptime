Accounts.validateNewUser((user) => {
  if (user.services.facebook) {
    return true;
  }

  if (!checkEmail(user.emails[0].address)) {
    throw new Meteor.Error(403, "You need a 'davidson.edu' email address to use Swaptime.");
  }

  return true;
});

var checkEmail = function(email) {
  //@gmail.com enabled for testing purposes
  var allowedDomains = ['davidson.edu', 'gmail.com'];

  //Could add admin emails here
  var allowedEmails = [''];

  var domain = email.replace(/.*@/,'').toLowerCase();
  return _.contains(allowedEmails, email) || _.contains(allowedDomains, domain);
};
