/**
 * map-container.js
 * This is the map component. It controls
 * interactivity and displays on the map.
 *
 * The map itself is Leaflet.
 *
 * Base layer is Mapbox tiles.
 *
 * Feature layer is cartoDb
 */
import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

// trying to maximize code reuse here
const zipObserverLayerHandler = observerLayerHandler,
  ownerObserverLayerHandler = observerLayerHandler;

export default Ember.Component.extend({
  center: [42.3653, -83.0693], // Detroit

  sqlService: Ember.inject.service('sql'),
  styleService: Ember.inject.service('styles'),

  /**
   * observes user toggling of feature layers.
   * calls #toggleLayers on change.
   * @observes layers.@each.visible
   */
  layersObserver: Ember.observer('layers.@each.visible', function () {
    const layers = this.get('layers'),
      sublayers = this.get('viz').getSubLayers();

    _.each(layers, toggleLayers(sublayers));
  }),

  /**
   * pans the map to the new active property latlng
   * @observes activeProperty
   */
  propertyObserver: Ember.observer('activeProperty', function () {
    const map = this.get('map'),
      active = this.get('activeProperty');

    if (active) {
      map.panTo([_.get(active, 'longitude'), _.get(active, 'latitude')], { animate: true });
    }
  }),

  /**
   * calls #observerLayerHandler on change
   * focuses feature layer on parcels matching #activeOwner.owner
   * @observes activeOwner
   */
  ownerObserver: Ember.observer('activeOwner', function (controller, key) {
    ownerObserverLayerHandler(controller, key); // ¯\_(ツ)_/¯
  }),

  /**
   * calls #observerLayerHandler on change
   * focuses feature layer on parcels matching #activeOwner.ownerzip
   * @observes activeZip
   */
  zipObserver: Ember.observer('activeZip', zipObserverLayerHandler),

  didInsertElement() {
    const controller = this,
      map = new L.Map('map', { zoomControl: false }).setView(controller.get('center'), 15),
      sql = controller.get('sqlService').default,
      styles = controller.get('styleService').default,
      layers = controller.get('layers').map(mapLayers(sql, styles)),
      attr = '&copy; <a href="https://www.mapbox.com/about/maps/"">Mapbox</a>',

      layerSource = {
        user_name: 'eightbitriot',
        type: 'cartodb',
        cartodb_logo: false,
        attribution: attr,
        sublayers: layers
      };

    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer(`https://api.tiles.mapbox.com/v4/${ENV.MAPBOX_ID}/{z}/{x}/{y}.png?access_token=${ENV.MAPBOX_TOKEN}`)
      .addTo(map);

    cartodb.createLayer(map, layerSource)
      .addTo(map)
      .done(function (layer) {
        _.each(layer.getSubLayers(), addInteractive(controller));
        controller.set('viz', layer);
        document.querySelector('.loading-overlay').classList.remove('is-loading');
      });

    this.set('map', map);
  }
});

/**
 * handles toggling of feature sublayers
 * @param  {[]} sublayers - array of cartoDb sublayers
 * @return {callback}
 */
function toggleLayers (sublayers) {

  // iterate over each sublayer
  return function (layer, index) {

    // if layer is not marked visible but
    // is visible on the map then hide it
    if (!layer.visible && sublayers[index].isVisible()) {
      sublayers[index].hide();
    }

    // if layer is marked visible but
    // isn't visible on map then show it
    if (layer.visible && !sublayers[index].isVisible()) {
      sublayers[index].show();
    }

    // TODO: is there a simpler way to do this?
  };
}

/**
 * handles defining cartoDb sublayers
 * @param  {{}} sql - cartodb sql instance
 * @param  {string} styles - string of cartoCSS
 * @return {callback}
 */
function mapLayers(sql, styles) {
  return function (layer, index) {
    return {
      sql: sql + '\nwhere layer = ' + index,
      cartocss: styles,
      interactivity: 'cartodb_id'
    };
  };
}

/**
 * sets interactions on the featurelayers
 * @param {controller} controller - Ember controller
 * @returns {callback}
 */
function addInteractive(controller) {
  return function (sublayer) {
    sublayer.setInteraction(true);

    sublayer.on('featureClick', featureClick(controller));
  };
}

/**
 * sets activeProperty on click
 * @param  {controller} controller - Ember controller
 * @return {callback}
 */
function featureClick(controller) {

  // find the parcel in the model by id
  // and set #activeProperty
  return function (event, latlng, pos, data) {
    const id = data.cartodb_id,
      active = controller.get('model').findBy('id', id);

    controller.set('activeProperty', active);
  };
}

/**
 * handles observing both activeOwner & activeZip
 * @param  {controller} controller - Ember controller
 * @param  {String} key - the property being observed ('activeZip'|'activeOwner')
 */
function observerLayerHandler(controller, key) {
  const active = controller.get(key),
    layer = controller.get('viz'),
    layers = controller.get('layers'),
    service = controller.get('sqlService'),
    styles = controller.get('styleService').default,
    sublayers = layer.getSubLayers(),

    // is true if active has no property id & the
    // number of current sublayers is greater than
    // the number of layers – this is fucked
    toUnsetActiveLayer = !_.has(active, 'id') && _.size(sublayers) > _.size(layers);

  let index;

  // if active is not null
  if (active) {
    // hide every carto sublayer
    _.each(sublayers, sublayer => sublayer.hide());

    // create a new sublayer
    layer.createSubLayer({
      sql: service[key](active),
      cartocss: styles,
      interactivity: 'cartodb_id'
    });

    // set index to equal the index of the
    // layer we just added
    index = _.findLastIndex(layer.getSubLayers());

    // add interactivity to our new layer
    layer.getSubLayer(index).setInteraction(true);
    layer.getSubLayer(index).on('featureClick', featureClick(controller));
  }

  if (toUnsetActiveLayer) {
    // remove the last (i.e., most recently) added sublayer
    _.last(layer.getSubLayers()).remove();
    // run #toggleLayers over each of the sublayers
    _.each(layers, toggleLayers(sublayers));
  }
}
