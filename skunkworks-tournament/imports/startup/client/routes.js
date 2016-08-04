import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import
import '../../ui/layouts/app-body.js';
import '../../ui/components/create_tournament.js';
import '../../ui/pages/alltournaments.js';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render("Appbody", {content: "create_tournament"});
  },
})

FlowRouter.route('/create_tournament', {
  action() {
    BlazeLayout.render("Appbody", {content: "create_tournament"});
  },
});

FlowRouter.route('/tournaments', {
  action() {
    BlazeLayout.render("Appbody", {content: "alltournaments"});
  },
});
