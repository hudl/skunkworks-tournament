import { Mongo } from 'meteor/mongo';

export const Tournaments = new Mongo.Collection('tournaments');
export const Locations = new Mongo.Collection('locations');
export const Matches = new Mongo.Collection('matches');
export const Participants = new Mongo.Collection('participants');
export const Records = new Mongo.Collection('records');
