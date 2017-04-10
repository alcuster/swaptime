Accounts.onCreateUser(function (options, user) {
    if (user.services.facebook) {
      if (options.profile) {
        options.profile.displayname = user.services.facebook.name;
        options.profile.picture = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.avatar = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";

        user.profile = options.profile;
        //user.profile = {displayname: user.services.facebook.name};
        user.emails = [{address: user.services.facebook.email, verified: false}];
      }

    } else {
      user.profile = {displayname: options.profile.displayname,
                      avatar: "https://s3.amazonaws.com/swaptime/default_avatar.png",
                      picture: "https://s3.amazonaws.com/swaptime/default_profile_pic.png"};
    }
    //user.username = user.services.facebook.name;
    return user;
});
