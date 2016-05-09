/**
 * TODO: Leaflet & CartoDB currently exist
 * in the global scope and that is BAD. define
 * them as dependencies that can be imported
 */
import Ember from 'ember';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

var App;

console.log(`Property Praxis is a project of the Digital Interactive Research Trajectories (DIRT) collective.

  We are:

  * Joshua Akers (Research) <http://umdearborn.edu/casl/jakers/>
  * Alex B. Hill (Design/Research) <http://design.alexbhill.org/>
  * Aaron Petcoff (Web Design/Development) <http://aaronpetcoff.me/>

  Having issues? Report them at https://github.com/alexbhill/project-pip/issues`);

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

function ready() {
  console.log(figlet.textSync('Property Praxis'));
}
