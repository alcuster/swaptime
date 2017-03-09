Accounts.onCreateUser(function (options, user) {
    if (user.services.facebook) {
      user.profile = {displayname: user.services.facebook.name};
      user.emails = [{address: user.services.facebook.email, verified: true}];
    } else {
      user.profile = {displayname: options.profile.displayname};
    }
    //user.username = user.services.facebook.name;
    return user;
});
