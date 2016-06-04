import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Route.extend({
  sqlService: Ember.inject.service('sql'),

  // don't wait to insert components
  // etc for large model. just load the
  // model in the background
  afterModel() {
    const sql = this.get('sqlService'),
      query = sql.prefix + encodeURIComponent(sql.model),
      worker = new Worker(ENV.cartoWorker),
      visited = localStorage.getItem('visited') || false,
      controller = this.controllerFor('index'),

      /*––––––––––––––––––––––––––––––––––––––|
      | NOTE: You this is the CartoDB ID      |
      | of the intially set active property   |
      | on an indivudal user's first visit.   |
      | You can replace this value w/ any     |
      | valid CartoDB ID                      |
      –––––––––––––––––––––––––––––––––––––––*/
      initParcel = 44710; // Address: 7714 Foster

    // fetch ajax & process data
    // in a web worker
    worker.postMessage(query);

    worker.onmessage = function (e) {
      // resolve the promise when the worker
      // is done
      controller.set('model', e.data);

      if (!visited) {
        controller.set('activeProperty', controller.get('model').findBy('id', initParcel));
      }
    };

    if (!visited) {
      controller.set('legendIsToggled', true);
    }

    localStorage.setItem('visited', true);
  }
});
