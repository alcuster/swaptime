Accounts.onCreateUser(function (options, user) {
    if (!user.services.facebook) {
        return user;
    }
    //user.username = user.services.facebook.name;
    user.profile = {displayname: user.services.facebook.name};
    user.emails = [{address: user.services.facebook.email, verified: true}];

    return user;
});
