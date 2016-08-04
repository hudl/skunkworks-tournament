import { Template } from 'meteor/templating';
import { Tournaments } from '../api/tournaments.js';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import './body.html';
import {  } from '../../api/methods.js';
import { ReactiveVar } from 'meteor/reactive-var';
const CONNECTION_ISSUE_TIMEOUT = 5000;

Template.body.helpers({
  tournaments() {
    return Tournaments.find({});
  },
});