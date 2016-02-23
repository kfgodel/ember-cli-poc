/* jshint node: true */
'use strict';

module.exports = {
  name: 'ateam-ember-marked',

  included: function(app) {
    this._super.included(app);

    // Import the dependency in the host app
    app.import('bower_components/marked/marked.min.js');
  }
};
