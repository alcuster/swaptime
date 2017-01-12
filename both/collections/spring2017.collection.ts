import { MongoObservable } from "meteor-rxjs";
import { Meteor } from 'meteor/meteor';

import { Course } from "../models/course.model";

export const Spring2017 = new MongoObservable.Collection<Course>('spring2017');
