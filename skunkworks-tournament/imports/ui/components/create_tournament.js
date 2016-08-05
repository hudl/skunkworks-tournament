import './create_tournament.html';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.create_tournament.created = function(){
  this.locations = new ReactiveVar([]);
};

Template.create_tournament.helpers({
  locations: function() {
    return Template.instance().locations.get();
  }
});

Template.create_tournament.events({
  'click #add_location'(event, template){
    // create and add location to reactive var
    var currLocations = template.locations.get();
    currLocations.push({
      address: $('#address').val(),
      start_time: $('#start').val(),
      end_time: $('#end').val(),
      fields: $('#fields').val()
    });
    template.locations.set(currLocations);
  },
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
    const formData = $('#create').serializeObject();
    const object = {
      tournament: {
        type: "round_robin",
        title: formData.title,
        category: formData.category,
        status: 2,
        teams: true,
        size: parseInt(formData.size, 10),
        score_entry: false,
        format: 1,
        groups: parseInt(formData.group, 10),
      },
      locations: template.locations.get(),
    };
    var result = Meteor.call('createTournament', object, function(err,response) {
      if(err) {
          return;
      }
      return response.content;
    });
    FlowRouter.go('/tournaments');
  },
});
