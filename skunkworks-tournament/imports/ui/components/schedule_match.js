import './schedule_match.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Tournaments } from '../../api/tournaments.js';

Template.schedule_match.created = function() {
    this.tournaments = new ReactiveVar([]);
    this.params = new ReactiveVar(undefined);
}

Template.schedule_match.helpers({
    tournaments: function() {
        return Session.get('tournaments');
    },
    params: function() {
        return Session.get('params');
    },
  });

Template.schedule_match.onRendered(
  function (template) {
   // set stuff up
   Session.set('params', FlowRouter.getParam("tid"));
   Meteor.call('viewTournaments', function(err, tournament) {
        if(err) {
            console.log(err);
            return;
        }
        else {
          Meteor.call('returnGroups', tournament, function(err, groups) {
            tournament["groups"] = groups;
            console.log(tournament["groups"]);
            Session.set('tournaments',tournament);
          });
        }
        // need to display the groups within the tournament
    });
});
