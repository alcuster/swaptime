import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Users } from '../../../both/collections/users.collection';
import { User } from '../../../both/models/user.model';

Meteor.publish('users', function(): Mongo.Cursor<User> {
  if (!this.userId) {
    return Users.collection.find({}, { fields: { 'profile.avatar': 0, 'profile.picture': 0, 'profile.displayname': 0 } });
  }

  const unverified = Meteor.users.findOne({_id: this.userId, 'emails.0.verified': false});

  if (unverified) {
    return Users.collection.find({}, { fields: { 'profile.avatar': 0, 'profile.picture': 0, 'profile.displayname': 0 } });
  }

  //Iff a user is logged and in has a verified email, show other users'
  //entire profiles
  return Users.collection.find({}, { fields: { profile: 1 } });

});
