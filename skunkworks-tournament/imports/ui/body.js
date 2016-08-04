import { Template } from 'meteor/templating';
import { Tournaments } from '../api/tournaments.js';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import './body.html';
import {  } from '../../api/methods.js';
import { ReactiveVar } from 'meteor/reactive-var';
const CONNECTION_ISSUE_TIMEOUT = 5000;

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);

Meteor.startup(() => {
  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(() => {
    // FIXME:
    // Launch screen handle created in lib/router.js
    // dataReadyHold.release();

    // Show the connection error box
    showConnectionIssue.set(true);
  }, CONNECTION_ISSUE_TIMEOUT);
});


Template.body.helpers({
  tournaments() {
    return Tournaments.find({});
  },
});

'click .text-class'() {
console.log('here');
    Meteor.call('createTournament', {tournament: {"type": "bracket"}});
};