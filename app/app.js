import Ember from 'ember';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

var App;

console.log(`Property Praxis is a project of the Urban Praxis Workshop.

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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', config.ANALYTICS, 'auto');
ga('send', 'pageview');

export default App;
