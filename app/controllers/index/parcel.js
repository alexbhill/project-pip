import Ember from 'ember';
import words from 'npm:lodash/words';
import difference from 'npm:lodash/difference';
import intersection from 'npm:lodash/intersection';

export default Ember.Controller.extend({
  // show alias if name and alias have
  // difference but no intersection
  showAlias: Ember.computed('names', function () {
    const model = this.get('model'),
      name = words(model.names.join(', ')),
      alias = words(model.alias);

    return difference(name, alias).length && !intersection(alias, name).length;
  }),

  geometry: Ember.computed('model.longitude', 'model.latitude', function () {
    const model = this.get('model');

    return [model.longitude, model.latitude];
  })
});
