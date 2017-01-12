import { Meteor } from 'meteor/meteor';
import { Spring2017 } from '../../../both/collections/spring2017.collection';

Meteor.publish('spring2017', () => Spring2017.find());
