import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Service.extend({
  formatAddress(address) {
    return _.words(address, /[A-Za-z0-9]+/g).map(word => {
      let test = /^ma?c/ig;
      word = word.toLowerCase();

      if (test.test(word)) {
        let match = word.match(test)[0],
          substr = word.substr(match.length);

        word = word.slice(0, match.length) + substr.charAt(0).toUpperCase() + substr.substr(1);
      }

      return _.capitalize(word);
    }).join(' ');
  },

  fetch() {
    let formatAddress = this.get('formatAddress'),
      data = new Ember.RSVP.Promise(resolve => {
        if (ENV.environment === 'development') {
          // if local use FIXTURE
          return Ember.$.getJSON('./FIXTURE.json').
            then(data => resolve(data));
        } else if (ENV.environment === 'production') {
          // if prod use Google Sheets
          Tabletop.init({
            key: ENV.DATA_KEY,
            simpleSheet: true,

            callback(data) {
              resolve(data);
            }
          });
        }
      });

    return data.then(data => {
      return _.map(_.sortByAll(data, ['lat', 'long']), property => {
        return _.merge(Ember.copy(property), {
          address: formatAddress(property.address),
          owner: _.capitalize(property.owner),
          streetView: `https://maps.googleapis.com/maps/api/streetview?size=640x640&pitch=0&location=${property.lat},${property.long}&pitch=10&key=${ENV.STREETVIEW_KEY}`,
          linkStreetview: `https://www.google.com/maps?q=&layer=c&cbll=${property.lat},${property.long}`
        });
      });
    });
  }
});
