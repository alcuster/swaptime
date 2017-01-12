import { Meteor } from 'meteor/meteor';
import { ListingsCollection } from '../../../both/collections/listings.collection';

Meteor.publish('listings', () => ListingsCollection.find());
