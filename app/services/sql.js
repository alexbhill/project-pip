import Ember from 'ember';
import _ from 'npm:lodash';

/**
 * Model and map data is stored in a a postGIS database
 * on cartoDb.
 *
 * use ajax calls to get data from the db http://docs.cartodb.com/cartodb-platform/sql-api/making-calls/
 *
 * each row in the db is a new property.
 *
 * columns:
 * cartodb_id - unique id for cartodb
 * the_geom - geometric data for cartodb
 * count - number of rows with this `own_id`
 * layer - layers 0 - 5 depending on value of `count`
 * legaldes - not used
 * own_id - name of the owner of this property or the managing LLC
 * own_type - i believe these are all "spec"
 * ownercity - owner's business address city
 * ownername1 - owner or managing llc
 * ownername2 - secondary owner or managing llc
 * ownerstate - owner's business address state
 * ownerstr - owner's business address street
 * ownerzip - owner's business address zip
 * parcelno - city parcel number
 * propaddr - address of property
 * propclass - class number of property's legal desig.
 * propdir - couldn't tell you
 * propno - city's property number (distinct from parcel?)
 * propstr - property street address
 * propzip - property zip
 * shape_star - parcel shape data
 * shape_stle - parcel shape data
 * subdiv - name of property's subdivision
 * taxstatus - property tax status
 * the_geom_webmercator - parcel shape data for carto
 * ward - city's ward
 * xcoord - latitude
 * ycoord - longitude
 * zipcount - number of rows with this `propzip`
 */

const fields = ['cartodb_id', 'count', 'layer', 'own_id', 'ownername1', 'ownercity', 'ownerstate', 'ownerstr', 'ownerzip', 'propaddr', 'propzip', 'xcoord', 'ycoord', 'zipcount'],
   user = 'ughitsaaron',
   table = 'parcels';

export default Ember.Service.extend({
  prefix: `http://${user}.cartodb.com/api/v2/sql?q=`,
  default: `select * from ${table}`,
  model: `select ${fields.join(', ')} from ${table}`,

  activeOwner: function (property) {
    return `select * from ${table} where own_id = '${_.get(property, 'owner')}'`;
  },

  activeZip: function (property) {
    return `select * from ${table} where propzip = '${_.get(property, 'zip')}'`;
  }
});
