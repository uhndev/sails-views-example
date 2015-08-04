/**
 * sails-drop-views
 *
 * In order to support database views in sails, one needs to drop views before
 * the ORM loads, otherwise sails won't know what to do with the models defined
 * in models/views.  Here we read the config/db directory an iterate over the
 * filenames to create and execute a drop view query.
 */

(function() {
  var pg = require('pg');
  var _ = require('lodash');

  module.exports = function (sails) {
    var env = sails.config.environment;
    var connection = sails.config.connections[env];

    var connectionStr = [
      'postgres://', connection.user, ':', connection.password,
      '@', connection.host, ':', connection.port, '/', connection.database
    ].join('');

    var views = _.map(require('fs').readdirSync('config/db'), function(file) {
      return file.slice(0, -4);
    });

    return {
      initialize: function (next) {
        sails.after('hook:blueprints:loaded', function () {
          pg.connect(connectionStr, function (err, client, done) {
            if (err) {
              console.log('Error fetching client from pool', err);
              return next(err);
            }
            var dropQuery = _.map(views, function (view) {
              return 'DROP VIEW IF EXISTS ' + view + ';';
            }).join(' ');
            client.query(dropQuery, function (err, result) {
              if (err) {
                console.log('Error running query: ' + err);
              }
              done();
              sails.log('Drop View Query executed successfully');
              next();
            })
          })
        });
      }
    };
  };

})();

