import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../startup/server';
import { Tournaments, Locations} from './tournaments.js';
var names2 = ['Olivia', 'Billy', 'Chad', 'Bobby', "Samantha", 'Lilly', "Ben", 'Chris', "Stephen", "John", "Luke", "Lauren", "Garrett", "Michael"];
if (Meteor.isServer) {
//    Meteor.publish('alltournaments', function tournamentsPublication() {
//        return Tournaments.find().fetch();
//    })
Meteor.methods({
  'createTournament': function(object) {
    this.unblock();
    var request = HTTP.post('https://bracketcloud.com/api/1.0/tournaments?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b', {data: object.tournament});
    var participants_url = "https://bracketcloud.com/api/1.0/tournaments/" + request.data.tid.toString() + "/participants?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b";
    var request_participants = HTTP.post(participants_url, {data: {names: names2}});
    var tourny_url = "https://bracketcloud.com/api/1.0/tournaments/" + request.data.tid.toString() + "?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b";
    var real_tournament = HTTP.get(tourny_url);
    console.log(real_tournament.data);
    if (request.statusCode == 200) {
      // create a list of locations associated with a tournament
      // cycle through the list of locations given and set informtion of the location
      var response = Tournaments.insert(real_tournament.data, function(err, _id){
        var add_location = object.locations.map(function(l){ l["tid"] = _id});
        Locations.insert(object.locations);
        console.log(_id);
      });
      return request;
    }
  },

  'viewTournaments'() {
        var tournaments = Tournaments.find().fetch();
        return tournaments;
  }
});
}