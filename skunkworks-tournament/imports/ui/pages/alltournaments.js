import './alltournaments.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Tournaments } from '../../api/tournaments.js';

var titles = [];
Template.alltournaments.created = function() {
    this.tournaments = new ReactiveVar([]);
}

Template.alltournaments.helpers({
        tournaments: function() {
            return Session.get('tournaments');
            },
      links: function() {
        var names = Session.get('tournaments');
        names.forEach(function(entry) {

        });
      }
      });

Template.alltournaments.events = {
    "click .tourney": function() {
    }
}

Template.alltournaments.onRendered(
      function (template) {
       Meteor.call('viewTournaments', function(err, response) {
            if(err) {
                console.log(err);
                return;
            }
            else {
                var tournaments = [];

                response.forEach(function(entry) {
                    console.log(entry);
                    tournaments.push(entry.title);
                    Session.set(entry._id, entry);
                });
                Session.set('tournaments', tournaments);
            }
        });
      });