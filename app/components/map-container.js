import Ember from 'ember';
import each from 'npm:lodash/each';
import ENV from 'property-praxis/config/environment';

const table = ENV.TABLE_NAME,
  mappings = ENV.DATA_MAPPINGS,
  attr = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default Ember.Component.extend({
  elementId: 'map',

  styleService: Ember.inject.service('styles'),

  // init map
  didInsertElement() {
    const controller = this,
      map = new L.Map('map', { zoomControl: false }).setView(ENV.INIT_CENTER, ENV.INIT_ZOOM);

    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer(`//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png`)
      .addTo(map);

    controller.set('map', map);

    const layerSource = {
      user_name: ENV.USERNAME,
      type: 'cartodb',
      cartodb_logo: false,
      attribution: attr,
    };

    layerSource['sublayers'] = controller.get('layers').map(mapLayers(controller));

    cartodb.createLayer(map, layerSource)
      .addTo(map)
      .done(function (viz) {
        controller.set('viz', viz);

        each(viz.getSubLayers(), addInteractive(controller));

        document.querySelector('.loading-overlay').classList.remove('is-loading');
      });

  },

  renderMap: function () {
    const controller = this,
      path = controller.get('router.currentPath'),
      map = controller.get('map'),
      layers = controller.get('layers'),
      viz = controller.get('viz');

    // check if viz is defined yet
    // since it's loaded async
    if (viz) {
      // begin the crazy complexity, sorry :(
      switch(path) {
        case 'index.owner':
          // if user is on owner route hide all layers
          each(viz.getSubLayers(), layer => layer.hide());

          // create new layer for just the owner's parcels
          viz.createSubLayer({
            sql: `select * from ${table}\n` +
                 `where ${mappings.owner} = '${controller.get('names')}'`,
            cartocss: controller.get('styleService').default,
            interactivity: 'cartodb_id'
          });

          // add interactivity to new layer
          each(viz.getSubLayers(), addInteractive(controller));

          break;

        case 'index.parcel':
          // if user is on parcel route just pan the map to that parcel
          map.panTo(controller.get('geography'), { animate: true });
          break;

        default:
          // all other routes (just index, really)
          // check for & removes any extra layers added
          if (viz.getSubLayerCount() > layers.length) {
            viz.getSubLayers().pop().remove();
          }

          each(controller.get('layers'), toggleLayers(viz));
      }
    }

  }.on('didRender').observes('viz'),
  // observes viz since viz is loaded async

  updateLayers: Ember.observer('layers.@each.visible', function () {
    each(this.get('layers'), toggleLayers(this.get('viz')));
  }),

  actions: {
    transition: function(id) {
      this.get('router').transitionTo('index.parcel', id);
    }
  }
});

/**
 * Toggles sublayers
 */
function toggleLayers (viz) {
  return function (layer, index) {
    const sublayer = viz.getSubLayer(index);

    if (layer.visible) {
      sublayer.show();
    } else {
      sublayer.hide();
    }
  };
}

/**
 * Sets each carto sublayer
 */
function mapLayers(controller) {
  return function (layer, index) {
    return {
      sql: `select * from ${ENV.TABLE_NAME}\n` +
           `where ${mappings.layer} = ${index}`,
      cartocss: controller.get('styleService').default,
      interactivity: `${mappings.id}`
    };
  };
}

/**
 * Sets interactivity for each layer
 */
function addInteractive(controller) {
  return function (sublayer) {
    sublayer.setInteraction(true);

    sublayer.on('featureClick', function (event, latlng, pos, data) {
      const id = data[mappings.id];

      // transition route when clicking on parcel
      controller.send('transition', id);

      ga('send', 'event', 'parcel', 'click', id);
    });
  };
}
