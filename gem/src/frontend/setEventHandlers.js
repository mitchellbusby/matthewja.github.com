// Generated by CoffeeScript 1.6.3
(function() {
  define(["jquery", "frontend/settings", "frontend/connections", "require"], function($, settings, connections, require) {
    var getInfo, setDoubleClickEvents, setEquationDraggables, setVariableDraggables;
    setEquationDraggables = function(element) {
      var draggableProperties;
      if (element == null) {
        element = null;
      }
      draggableProperties = {
        containment: "#whiteboard-panel",
        scroll: false,
        cancel: ".variable",
        drag: function(event, ui) {
          return connections.repaintVariables($(event.target));
        },
        stop: function(event, ui) {
          return connections.repaintVariables($(event.target));
        }
      };
      if (element != null) {
        return element.draggable(draggableProperties);
      } else {
        $(".equation").draggable(draggableProperties);
        return $(".expression").draggable(draggableProperties);
      }
    };
    setDoubleClickEvents = function(element) {
      var target;
      if (element == null) {
        element = null;
      }
      if (element != null) {
        target = $(element).find(".variable");
      } else {
        target = $(".variable");
      }
      target.doubletap(function() {
        var formulaID, formulaType, variable, _ref;
        _ref = getInfo($(this)), variable = _ref[0], formulaType = _ref[1], formulaID = _ref[2];
        console.log("Double-clicked " + variable + " in " + formulaType + " " + formulaID);
        if (formulaType === "equation") {
          return require(["backend/solveEquation", "frontend/addExpression"], function(solveEquation, addExpression) {
            var expression;
            expression = solveEquation(formulaID, variable);
            return addExpression(expression);
          });
        }
      });
      return target.disableSelection();
    };
    setVariableDraggables = function(element) {
      var target;
      if (element == null) {
        element = null;
      }
      if (element != null) {
        target = $(element).find(".variable");
      } else {
        target = $(".variable");
      }
      target.draggable({
        start: function(event, ui) {
          if ($(event.target).parents(".equation").length !== 0) {
            $(ui.helper).addClass("equationVariableHelper");
          } else if ($(event.target).parents(".expression").length !== 0) {
            $(ui.helper).addClass("expressionVariableHelper");
          }
          $(ui.helper).css("font-size", $(event.target).css("font-size"));
          if (!settings.get("mathJaxEnabled")) {
            $(ui.helper).css("font-family", "monospace");
          }
          return $(event.target).fadeTo(0, 0);
        },
        drag: function(event, ui) {},
        stop: function(event, ui) {
          return $(event.target).fadeTo(0, 1);
        },
        containment: "#whiteboard-panel",
        revert: true,
        helper: "clone",
        appendTo: "#whiteboard-panel"
      });
      return target.droppable({
        tolerance: "pointer",
        accept: ".variable",
        drop: function(event, ui) {
          var draggableFormulaID, draggableFormulaType, draggableID, droppableFormulaID, droppableFormulaType, droppableID, variableIDa, variableIDb, _ref, _ref1;
          _ref = getInfo($(event.target)), droppableID = _ref[0], droppableFormulaType = _ref[1], droppableFormulaID = _ref[2];
          _ref1 = getInfo($(ui.draggable)), draggableID = _ref1[0], draggableFormulaType = _ref1[1], draggableFormulaID = _ref1[2];
          if (droppableFormulaType === "equation" && draggableFormulaType === "equation") {
            variableIDa = getInfo($(event.target))[0];
            variableIDb = getInfo($(ui.draggable))[0];
            return connections.setEquivalency(variableIDa, variableIDb);
          }
        }
      });
    };
    getInfo = function(variableElement) {
      var formulaID, formulaNumber, formulaType, variable, _ref;
      variable = variableElement.attr("id");
      if (/variable-/.test(variable)) {
        variable = variable.split("-").slice(1).join("-");
      }
      formulaID = variableElement.parents("div").attr("id");
      _ref = formulaID.split("-"), formulaType = _ref[0], formulaNumber = _ref[1];
      return [variable, formulaType, formulaNumber];
    };
    return function(element) {
      if (element == null) {
        element = null;
      }
      setEquationDraggables(element);
      setDoubleClickEvents(element);
      return setVariableDraggables(element);
    };
  });

}).call(this);
