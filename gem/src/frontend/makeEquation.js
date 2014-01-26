// Generated by CoffeeScript 1.6.3
(function() {
  define(["frontend/addEquation", "backend/formulae"], function(addEquation, formulae) {
    return function(left, right, add) {
      var equation, equationID;
      if (add == null) {
        add = false;
      }
      equation = formulae.makeEquation(left, right);
      if (add) {
        equationID = addEquation(equation);
      }
      return [equationID, equation];
    };
  });

}).call(this);
