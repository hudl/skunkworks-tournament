import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
import '../../ui/components/create_tournament.js';
import '../../ui/pages/alltournaments.js';
import '../../ui/components/home.js';
import '../../ui/components/tournament.js';

FlowRouter.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render("Appbody", {content: "home"});
  },
});

FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render("Appbody", {content: "home"});
  },
});

FlowRouter.route('/create_tournament', {
  name: 'create_tournament',
  action() {
    BlazeLayout.render("Appbody", {content: "create_tournament"});
  },
});

FlowRouter.route('/schedule_match', {
  action() {
    BlazeLayout.render("Appbody", {content: "create_tournament"});
  },
});


FlowRouter.route('/tournaments/', {
  name: 'viewtournaments',
  action() {
    BlazeLayout.render("Appbody", {content: "alltournaments"});
  },
});

FlowRouter.route('/tournaments/:contentId', {
  name: 'viewtournament',
  action() {
    BlazeLayout.render("Appbody", {content: "tournament"});
  },
});
