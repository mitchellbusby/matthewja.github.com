// Generated by CoffeeScript 1.6.3
(function() {
  require.config({
    paths: {
      "jquery": "lib/jquery.min",
      "jqueryui": "lib/jquery-ui.min",
      "JSAlgebra": "lib/JS-Algebra/src/"
    },
    shim: {
      "jqueryui": ["jquery"]
    }
  });

  require(["jquery", "jqueryui", "frontend/setupFrontend"], function($, ui, setupFrontend) {
    return $(function() {
      return setupFrontend();
    });
  });

}).call(this);