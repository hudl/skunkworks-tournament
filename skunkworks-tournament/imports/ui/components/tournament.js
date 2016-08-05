import './tournament.html';
import { Tournaments } from '../../api/tournaments.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

Template.tournament.helpers({

        groupplay: function() {
            console.log(Session.get('kagHu2NEyesKRJGs2'));
            return [Session.get('kagHu2NEyesKRJGs2')];
            },
        links: function() {
            var names = Session.get('tournaments');
            names.forEach(function(entry) {

        });
      }
      });