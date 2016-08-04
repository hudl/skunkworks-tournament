import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './app-body.html';
import { Mongo } from 'meteor/mongo';
import { Tournaments } from '../../api/tournaments.js';

if (Meteor.isClient) {

  Template.Appbody.events = {
    'click .view-tournaments' : function viewTournaments () {
        Meteor.call('viewTournaments', function(err, response) {
            if(err) {
                console.log(err);
                return;
            }
            else {
                return response;
            }

        })
      },
  };


}
