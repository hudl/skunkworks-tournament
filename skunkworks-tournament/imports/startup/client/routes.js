import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import
import '../../ui/layouts/app-body.js';
import '../../ui/pages/tournaments.js';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render("App_body", {content: "tournaments"});
  },
})
