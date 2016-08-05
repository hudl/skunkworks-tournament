import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../startup/server';
import { Tournaments, Locations} from './tournaments.js';

Meteor.methods({
  'createTournament': function(object) {
    this.unblock();
    var request = HTTP.post('https://bracketcloud.com/api/1.0/tournaments?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b', {data: object.tournament})
    if (request.statusCode == 200) {
      // create a list of locations associated with a tournament
      // cycle through the list of locations given and set informtion of the location
      var response = Tournaments.insert(request.data, function(err, _id){
        var add_location = object.locations.map(function(l){ l["tid"] = _id});
        Locations.insert(object.locations);
      });
      return request;
    }
  },
  'viewTournaments'() {
        var tournaments = Tournaments.find().fetch();
        return tournaments;
  }
});
