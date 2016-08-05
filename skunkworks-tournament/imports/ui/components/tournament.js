import './tournament.html';
import { Tournaments, Records} from '../../api/tournaments.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'


var numbers = [];
var new_grouping = [];
var records;
function addRecord(participants) {
    var records = Meteor.call('getRecords', participants);
    return records;
}

Template.tournament.helpers({
        groupplay: function() {
            var tournament = Session.get('moHmWqZ7nuQ7Rat92').participants;
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
           var final_return = [];
              new_grouping.forEach(function(entry) {
                  var part = [];
                  entry.participants.forEach(function(participant) {
                    var records = Records.find({name: participant, tournament: entry.id[0]}).fetch();
                    console.log(records[0]);
                    part.push(records[0]);
                  });
                    part.sort(function(a, b) {
                        if (a.wins > b.wins) {
                            return -1;
                        }
                        else if (a.wins < b.wins) {
                            return 1;
                        }
                        else {
                           return 0;
                        }
                    });
                    var new_stuff = {group: entry.group, participants: part};
                    final_return.push(new_stuff);
                });
                console.log(final_return);
            var records = Meteor.call('getRecords', new_grouping, function(err, response) {
                return response;
            });
            return final_return;
            }
      });

Template.tournament.events = {
    "click .update-record": function() {
         FlowRouter.go('/tournaments/kagHu2NEyesKRJGs2/updaterecord');
    }
}


function updateScore(name, tournament, wins, losses) {
   Meteor.call('updateScore', name, tournament, wins, losses);
}


