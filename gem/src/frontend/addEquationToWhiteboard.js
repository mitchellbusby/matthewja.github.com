// Generated by CoffeeScript 1.6.3
(function() {
  define(["jquery", "frontend/setDraggables", "frontend/setDoubleClickEvents", "backend/nextEquationID"], function($, setDraggables, setDoubleClickEvents, nextEquationID) {
    var addEquationToWhiteboard;
    return addEquationToWhiteboard = function(equation) {
      var equationDiv, equationID, html;
      equationID = nextEquationID();
      html = equation.toMathML(equationID);
      equationDiv = $(html);
      $("#whiteboard-panel").append(equationDiv);
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      return MathJax.Hub.Queue(function() {
        setDraggables(equationDiv);
        return setDoubleClickEvents(equationDiv);
      });
    };
  });

}).call(this);
