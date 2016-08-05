import './tournament.html';
import { Tournaments } from '../../api/tournaments.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'


var numbers = [];
var new_grouping = [];
Template.tournament.helpers({

        groupplay: function() {
            var tournament = Session.get('CddSh9N6o3eFEmQmm').participants;
            console.log(tournament);
            new_grouping = _
            .chain(tournament)
            .groupBy('group_id')
            .map(function(value, key) {
                return {
                    group: key,
                    participants: _.pluck(value, 'name'),
                    id: _.pluck(value, 'tid')
                }
            }).value();
            return new_grouping;
            },
        name: function() {

        }
      });
