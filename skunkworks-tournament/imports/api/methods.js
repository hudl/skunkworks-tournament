import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../startup/server';
import { Tournaments } from './tournaments.js';

Meteor.methods({
  'createTournament': function(tournament) {
    this.unblock();
    var request = HTTP.post('https://bracketcloud.com/api/1.0/tournaments?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b', {data: tournament})
    if (request.statusCode == 200) {
        Tournaments.insert(request.data);
        return request;
    }
  },

  'viewTournaments'() {
        var tournaments = Tournaments.find().fetch();
        return tournaments;
  }
});