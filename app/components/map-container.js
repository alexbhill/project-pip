/**
 * map-container
 * component for handling the Leaflet & cartoDB map
 * base tiles are a leaflet map using tiles from mapbox
 * markers are a separate layer from cartodb
 */
import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'property-praxis/config/environment';

export default Ember.Component.extend({
  center: [42.3653, -83.0693], // Detroit

  sqlService: Ember.inject.service('sql'),
  styleService: Ember.inject.service('styles'),

  layersObserver: Ember.observer('layers.@each.visible', function () {
    let layers = this.get('layers'),
      sublayers = this.get('viz').getSubLayers();

    _.each(layers, toggleLayers(sublayers));
  }),

  activeObserver: Ember.observer('activeProperty.cartodb_id', function () {
    let map = this.get('map'),
      active = this.get('activeProperty');

    if (active) {
      map.panTo([active.y, active.x], { animate: true });
    }
  }),

  ownerObserver: Ember.observer('activeOwner.cartodb_id', function () {
    observerLayerHandler(this, 'activeOwner');
  }),

  zipObserver: Ember.observer('activeZip.cartodb_id', function () {
    observerLayerHandler(this, 'activeZip');
  }),

  didInsertElement() {
    let controller = this,
      map = new L.Map('map', { zoomControl: false }).setView(controller.get('center'), 14),
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
      });

    this.set('map', map);
  }
});

function toggleLayers (sublayers) {
  return function (layer, index) {
    if (!layer.visible && sublayers[index].isVisible()) {
      sublayers[index].hide();
    }

    if (layer.visible && !sublayers[index].isVisible()) {
      sublayers[index].show();
    }
  };
}

function mapLayers(sql, styles) {
  return function (layer) {
    return {
      sql: sql + '\n' + layer.sql,
      cartocss: styles,
      interactivity: 'cartodb_id'
    };
  };
}

function addInteractive(controller) {
  return function (sublayer) {
    sublayer.setInteraction(true);

    sublayer.on('featureClick', featureClick(controller));
  };
}

function featureClick(controller) {
  return function (event, latlng, pos, data) {
    let model = controller.get('model'),
      active = model.findBy('cartodb_id', data.cartodb_id);

    controller.set('activeProperty', active);
  };
}

function observerLayerHandler(controller, observeProperty) {
  let active = controller.get(observeProperty),
    layer = controller.get('viz'),
    layers = controller.get('layers'),
    service = controller.get('sqlService'),
    styles = controller.get('styleService').default,
    sublayers = layer.getSubLayers(),
    toUnsetActiveLayer = !_.has(active, 'cartodb_id') && _.size(sublayers) > _.size(layers),
    sql = _.includes(observeProperty, 'Zip')
          ? service.sqlQueryByZip(active)
          : service.sqlQueryByOwner(active),
    index;

  if (_.has(active, 'cartodb_id')) {
    _.each(sublayers, sublayer => sublayer.hide());

    layer.createSubLayer({
      sql: sql,
      cartocss: styles,
      interactivity: 'cartodb_id'
    });

    index = _.findLastIndex(layer.getSubLayers());

    layer.getSubLayer(index).setInteraction(true);
    layer.getSubLayer(index).on('featureClick', featureClick(controller));
  }

  if (toUnsetActiveLayer) {
    _.last(layer.getSubLayers()).remove();
    _.each(layers, toggleLayers(sublayers));
  }
}
