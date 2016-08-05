import './tournament.html';
import { Tournaments, Records} from '../../api/tournaments.js';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'


var numbers = [];
var new_grouping = [];
Template.tournament.helpers({

        groupplay: function() {
            console.log('HERE');
            var tournament = Session.get('iFjWDv4wWmssg7MAQ').participants;
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
            console.log(new_grouping);
//            var final_participants = addRecord(new_grouping);
            return new_grouping;
            }
      });

function addRecord(participants) {
    var records = Meteor.call('getRecords', participants,
    function(err,response) {
           if(err) {
               return;
           }
           return response.content;
    });

}
