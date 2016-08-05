import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../startup/server';
import { Tournaments, Locations, Records} from './tournaments.js';
var names2 = ['Olivia', 'Billy', 'Chad', 'Bobby', "Samantha", 'Lilly', "Ben", 'Chris', "Stephen", "John", "Luke", "Lauren", "Garrett", "Michael"];
if (Meteor.isServer) {
//    Meteor.publish('alltournaments', function tournamentsPublication() {
//        return Tournaments.find().fetch();
//    })
Meteor.methods({
  'createTournament': function(object) {
//    Tournaments.remove({});
//    Locations.remove({});
    this.unblock();
    var request = HTTP.post('https://bracketcloud.com/api/1.0/tournaments?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b', {data: object.tournament});
    var participants_url = "https://bracketcloud.com/api/1.0/tournaments/" + request.data.tid.toString() + "/participants?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b";
    var request_participants = HTTP.post(participants_url, {data: {names: names2}});
    var tourny_url = "https://bracketcloud.com/api/1.0/tournaments/" + request.data.tid.toString() + "?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b";
    setupRecords(request_participants.data);
    var real_tournament = HTTP.get(tourny_url);
    if (request.statusCode == 200) {
      // create a list of locations associated with a tournament
      // cycle through the list of locations given and set informtion of the location
      real_tournament.data["user_id"] = Meteor.user()._id;
      var response = Tournaments.insert(real_tournament.data, function(err, _id){
        var add_location = object.locations.map(function(l){ l["tid"] = _id});
        Locations.insert(object.locations);
      });
      return request;
    }
  },
  'returnGroups'(tournament) {
    var arr = [];
    tournament.map(function(t) {
      t.participants.map(function(p) {
        // a user has been added from the specific group id
        if(arr[p.group_id] === undefined) {
          arr[p.group_id] = [];
        }
        arr[p.group_id].push(p);
      });
    });
    return arr;
  },
  'viewTournaments'() {
        var tournaments = Tournaments.find({user_id: Meteor.user()._id}).fetch();
        return tournaments;
  },

  'getRecords'(participants) {
          var final_return = [];
          console.log(participants);
          participants.forEach(function(entry) {
              var part = [];
              entry.participants.forEach(function(participant) {
                var records = Records.find({name: participant, tournament: entry.id[0]}).fetch();
                part.push(JSON.stringify(records));
              });
                var new_stuff = {group: entry.group, participants: part};
                final_return.push(new_stuff);
            });
            return final_return;
  },

  'updateRecord'(name, tournament, win, losses) {
         Record.update({'name': name, 'tournament': tournament}, {'wins': wins, 'losses': losses});
  }
});

function setupRecords(participants) {
    participants.forEach(function(entry) {
        var name = entry.name;
        var tournament = entry.tid;
        var wins = 0;
        var losses = 0;
        var records = {'name': name, 'tournament': tournament, 'wins': wins, 'losses': losses};
        Records.insert(records);

    });
}
}
