import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '/' }, function() {
    this.route('parcel', { path: '/parcel/:id' });
    this.route('owner', { path: '/owner/:name' });
  });
});

export default Router;
