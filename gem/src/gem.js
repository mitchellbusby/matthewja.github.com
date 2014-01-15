// Generated by CoffeeScript 1.6.3
(function() {
  var VERSION;

  VERSION = "0.0.7";

  require.config({
    urlArgs: "v=" + VERSION,
    baseUrl: "./src",
    catchError: true,
    paths: {
      "coffeequate": "lib/Coffeequate/coffeequate",
      "jquery": "lib/jQuery/jquery.min",
      "jqueryui": "lib/jQuery/jquery.ui.min",
      "MobileEvents": "lib/jQuery/jquery.mobile.events.min",
      "ContextMenu": "lib/jQuery/jquery.contextMenu",
      "TouchPunch": "lib/TouchPunch/jquery.ui.touchpunch.min",
      "MathJax": (window.getParameter("mathJaxEnabled") === "false" ? "frontend/blank" : "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=MML_HTMLorMML")
    },
    shim: {
      "jqueryui": ["jquery"],
      "TouchPunch": ["jquery"],
      "MobileEvents": ["jquery"],
      "ContextMenu": ["jquery"],
      "MathJax": {
        exports: "MathJax",
        init: function() {
          MathJax.Hub.Config({
            config: ["MMLorHTML.js"],
            jax: ["input/MathML", "output/HTML-CSS"],
            extensions: ["mml2jax.js", "MathMenu.js", "MathZoom.js"],
            showMathMenu: false,
            showMathMenuMSIE: false
          });
          MathJax.Hub.Startup.onload();
          return MathJax;
        }
      }
    }
  });

  require.onError = function(err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    throw err;
  };

  require(["jquery", "jqueryui", "MobileEvents", "frontend/setupFrontend", "frontend/finishLoading", "frontend/setupSettings", "frontend/settings", "MathJax", "ContextMenu"], function($, ui, me, setupFrontend, finishLoading, setupSettings, settings, MathJax, ContextMenu) {
    return $(function() {
      setupSettings();
      require(["TouchPunch"]);
      setupFrontend();
      if (!settings.get("loadForever")) {
        return finishLoading();
      }
    });
  });

}).call(this);
