import { Template } from 'meteor/templating';

import { Tournaments } from '../api/tournaments.js';

import './body.html';

Template.body.helpers({
  tournaments() {
    return Tournaments.find({});
  },
});