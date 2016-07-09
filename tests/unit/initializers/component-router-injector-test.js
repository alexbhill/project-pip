import Ember from 'ember';
import ComponentRouterInjectorInitializer from 'property-praxis/initializers/component-router-injector';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | component router injector', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ComponentRouterInjectorInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
