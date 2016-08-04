import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import '../startup/server';


Meteor.methods({
  'createTournament'({ tournament }) {
    var options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        data : tournament
      }
    this.unblock();
    var request = HTTP.post('https://bracketcloud.com/api/1.0/tournaments?api_key=459103727ac4ee5fe8144ab4f1e0ec95fae8063b', {data: {type: "bracket"}})
    if (request.statusCode == 200) {
        return request;
    }
//    Tournaments.insert(newTournament);
  }
});