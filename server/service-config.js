Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  //Set Facebook oAuth tokens (defined in ./settings.json)
  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: Meteor.settings.private.oAuth.facebook.appId,
    loginStyle: "redirect",
    secret: Meteor.settings.private.oAuth.facebook.secret
  });

  //Set SMTP URL (defined in ./settings.json)
  //process.env.MAIL_URL = Meteor.settings.smtp;

  //Naive solution for restricting emails to '@davidson.edu'; ignores the
  //fact that many Facebook users don't tie their school account to FB.

  // Accounts.config({
  //   restrictCreationByEmailDomain: 'davidson.edu'
  // });
});
