import './alltournaments.html';
import { Template } from 'meteor/templating';



Template.alltournaments.helpers({
  tnames: [
      { text: 'This is task 1' },
      { text: 'This is task 2' },
      { text: 'This is task 3' },
    ],
});