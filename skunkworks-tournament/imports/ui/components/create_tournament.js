import './create_tournament.html';

Template.create_tournament.events({
  'submit #create'(){
    console.log('here!!');
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
    const tournament = {
      type: "round_robin",
      title: formData.title,
      category: formData.category,
      status: 2,
      teams: true,
      size: parseInt(formData.size, 10),
      score_entry: false,
      format: 1,
      groups: parseInt(formData.size, 10),
    };
    var result = Meteor.call('createTournament', tournament, function(err,response) {
            if(err) {
                return;
            }
            return response.content;
        });
  },
});
