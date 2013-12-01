// Generated by CoffeeScript 1.6.3
(function() {
  define(function() {
    var equations;
    equations = [];
    return {
      add: function(equation) {
        equations.push(equation);
        return equations.length - 1;
      },
      get: function(equationID) {
        if (equationID >= equations.length || equationID < 0) {
          throw new Error("No equation with ID " + equationID + " exists.");
        }
        return equations[equationID];
      },
      size: function() {
        return equations.length;
      }
    };
  });

}).call(this);
