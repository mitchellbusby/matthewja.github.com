// Generated by CoffeeScript 1.6.3
(function() {
  define(function() {
    var settings;
    settings = {
      mathJaxEnabled: true,
      connectionWidth: 1,
      variablePadding: 10,
      loadForever: false,
      assumeZeroUncertainty: true,
      showSymbolicUncertainties: false
    };
    return {
      get: function(name) {
        return settings[name];
      },
      set: function(name, value) {
        return settings[name] = value;
      },
      keys: function() {
        var key, keys;
        keys = [];
        for (key in settings) {
          keys.push(key);
        }
        return keys;
      }
    };
  });

}).call(this);
