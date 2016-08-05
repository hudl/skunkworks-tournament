import './update_record.html';
import { Tournaments, Records} from '../../api/tournaments.js';

Template.updaterecord.events({
  'submit #create'(event, template){
    event.preventDefault();
    $.fn.serializeObject = function()
    {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };
    console.log("HERE");
    const formData = $('#create').serializeObject();
    console.log(formData);
    Meteor.call('updateRecord', formData.title, 71557, formData.wins, formData.losses);
    FlowRouter.go('/tournaments');

  }
  })