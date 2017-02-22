import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = "swaptime";
Accounts.emailTemplates.from = "swaptime <admin@swaptime.trade>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[swaptime] Verify your Email Address";
  },
  text (user, url) {
    let emailAddress = user.emails[0].address,
        urlWithoutHash = url.replace('#/', ''),
        supportEmail = "alcuster@davidson.edu",
        emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
}
