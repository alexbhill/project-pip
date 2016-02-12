import Ember from 'ember';
// import squel from 'npm:squel';

// let postgres = squel.useFlavour('postgres');

export default Ember.Service.extend({
  sql: new cartodb.SQL({
    user: 'eightbitriot' // carto username
  }),

  table: 'property_praxis',

  aliases: {
    property: 'Property', // for property_praxis
    count: 'Property_Count' // for count column
  },

  columns: {
    id: 'cartodb_id',
    owner: 'own_id',
    count: 'own_count',
    address: 'propaddr'
  },

  standard: Ember.computed('', function () {
    const table = this.get('table'),
      aliases = this.get('aliases'),
      owner = this.get('columns').owner,
      count = this.get('columns').count,
      counter = `count(${owner})`;

    return `SELECT ${aliases.property}.*, ${aliases.count}.${count} FROM ${table} ${aliases.property} INNER JOIN (SELECT ${owner}, ${counter} AS ${count} FROM ${table} GROUP BY ${owner}) ${aliases.count} ON (${aliases.property}.${owner} = ${aliases.count}.${owner})`;
  })
});
