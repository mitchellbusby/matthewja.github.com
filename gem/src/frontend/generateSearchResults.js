// Generated by CoffeeScript 1.6.3
(function() {
  define(["jquery", "backend/formulae", "frontend/settings"], function($, formulae, settings) {
    return function() {
      var formula, _i, _len, _ref;
      _ref = formulae.getAllFormulaNames();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        formula = _ref[_i];
        $("#search-results ul").append($('<li id="formula-' + formula + '" class="search-result">' + formulae.get(formula).toMathML(null, false, "0", true) + '</li>'));
      }
      if (settings.get("mathJaxEnabled")) {
        return MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      }
    };
  });

}).call(this);
