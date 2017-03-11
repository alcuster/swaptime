Accounts.onCreateUser(function (options, user) {
    if (user.services.facebook) {
      if (options.profile) {
        options.profile.displayname = user.services.facebook.name;
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.avatar = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
        user.profile = options.profile;
        //user.profile = {displayname: user.services.facebook.name};
        user.emails = [{address: user.services.facebook.email, verified: true}];
      }

    } else {
      user.profile = {displayname: options.profile.displayname};
    }
    //user.username = user.services.facebook.name;
    return user;
});
