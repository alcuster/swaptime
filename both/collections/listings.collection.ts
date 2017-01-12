import { MongoObservable } from "meteor-rxjs";
import { Meteor } from 'meteor/meteor';

import { Listing } from "../models/listing.model";

export const ListingsCollection = new MongoObservable.Collection<Listing>("listings-collection");

function loggedIn() {
  return !!Meteor.user();
}

ListingsCollection.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
