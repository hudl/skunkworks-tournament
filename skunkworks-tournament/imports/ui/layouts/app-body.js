import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './app-body.html';
import { Mongo } from 'meteor/mongo';

if (Meteor.isClient) {
  Template.Appbody.events = {
    'click .waves-effect' : function () {
		var result = Meteor.call('createTournament', 'fill this with form data', function(err,response) {
			if(err) {
				return;
			}
			return response.content;
		});
    }
  };
}
