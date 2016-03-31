import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
  sqlService: Ember.inject.service('sql'),

  findAll: function () {
    const sqlService = this.get('sqlService'),
      sql = sqlService.sql,
      query = sqlService.default;

    return new Ember.RSVP.Promise(function (resolve) {
      sql.execute(query).done(function (data) {
        resolve(data.rows);
      });
    });
  }
});
