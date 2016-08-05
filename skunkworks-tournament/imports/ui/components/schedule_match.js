import './schedule_match.html';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Tournaments } from '../../api/tournaments.js';

Template.schedule_match.created = function() {
    this.tournaments = new ReactiveVar([]);
    this.params = new ReactiveVar(undefined);
    this.params2 = new ReactiveVar(undefined);
    this.opponents = new ReactiveVar([]);
    this.teams = new ReactiveVar([]);
    this.adversaries = new ReactiveVar([]);
    this.selectedTeam = new ReactiveVar(undefined);
    this.selectedTeamName = new ReactiveVar(undefined);
    this.locations = new ReactiveVar(undefined);
    this.infoSelected = new ReactiveVar(false);
    this.counter = new ReactiveVar(8);
    this.percentage = new ReactiveVar("");
}

Template.schedule_match.helpers({
    tournaments: function() {
        return Session.get('tournaments');
    },
    params: function() {
        return Session.get('params');
    },
    params2: function() {
        return Session.get('params2');
    },
    groups: function() {
        return Session.get('groups');
    },
    teams: function() {
        return Session.get('teams');
    },
    opponents: function() {
        return Session.get('opponents');
    },
    adversaries: function() {
        return Session.get('adversaries');
    },
    selectedTeam: function() {
        return Session.get('selectedTeam');
    },
    locations: function() {
        return Session.get('locations');
    },
    selectedTeamName: function() {
      return Session.get('selectedTeamName');
    },
    infoSelected: function() {
      return Session.get('infoSelected');
    },
    counter: function() {
      return Session.get('counter');
    },
    percentage: function() {
      return Session.get('percentage');
    },
  });

Template.schedule_match.onRendered(
  function (template) {
   // set stuff up
   Session.set('counter', 8);
   Session.set('percentage', "50");
   Session.set('params', FlowRouter.getParam("tid"));
   Meteor.call('viewTournaments', function(err, tournament) {
        if(err) {
            console.log(err);
            return;
        }
        else {
          var selectedTournament = tournament.filter(function(i){
            if (i._id == Session.get('params')){
              return i;
            }
          });
          Meteor.call('returnGroups', selectedTournament, function(err, groups) {
            Session.set('groups', groups);
            Session.set('tournaments', selectedTournament);
          });
        }
        // need to display the groups within the tournament
    });
});

Template.schedule_match.events({
  'change #age'() {
    Session.set('infoSelected', true);
  },
  'click .schedule'(event) {
    Session.set('params2',event.target.id);
    Session.set('teams', Session.get('groups')[event.target.id]);
    Session.set('opponents', undefined);
  },
  'click .schedule_game'(event) {
    var teams = Session.get('teams');
    var opponents = teams.filter(function(i) {
      return i.position !== parseInt(event.target.id);
    });
    var team1 = teams.filter(function(i) {
      return i.position === parseInt(event.target.id);
    });
    Session.set('opponents', opponents);
    Session.set('selectedTeam', team1);
    console.log(team1);
    Session.set('selectedTeamName', team1[0].name);
  },
  'click .pick_team'(event) {
    var teams = Session.get('teams');
    var team1 = teams.filter(function(l) {
      return l.position === parseInt(event.target.id);
    });
    var team2 = Session.get('selectedTeam');
    Session.set('adversaries', [team2[0], team1[0]]);
    var locations = [ {name: 'Total Soccer Sports Complex'},
                      {name: 'Frasier Soccer Complex'}]
    Session.set('locations',locations);
  },
  'click #final'(event) {
    Session.set('adversaries', undefined);
    Session.set('opponents', undefined);
    Session.set('teams', undefined);
    Session.set('params2', undefined);
    Session.set('counter', Session.get('counter')+1);
    Session.set('percentage',"58");
  }
});
