// Generated by CoffeeScript 1.6.3
(function() {
  define(["jquery", "frontend/settings", "frontend/connections", "require", "frontend/substituteEquation", "backend/expressionIndex", "frontend/makeEquation", "backend/numericalValues", "frontend/alert"], function($, settings, connections, require, substituteEquation, expressionIndex, makeEquation, numericalValues, alert) {
    var getInfo, initialised, setContextMenus, setDoubleClickEvents, setEquationDraggables, setVariableDraggables;
    initialised = false;
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
            var expressionID, solution, solutions, _i, _len, _results;
            solutions = solveEquation(formulaID, variable);
            _results = [];
            for (_i = 0, _len = solutions.length; _i < _len; _i++) {
              solution = solutions[_i];
              _results.push(expressionID = addExpression(solution));
            }
            return _results;
          });
        }
      });
      return target.disableSelection();
    };
    setContextMenus = function(element) {
      var target;
      if (element == null) {
        element = null;
      }
      if (element != null) {
        target = $(element).find(".variable");
      } else {
        target = $(".variable");
      }
      target.contextMenu("context-menu-variable", {
        "Set numerical value": {
          click: function(variableElement) {
            var equation, equationID, formulaID, formulaType, value, variable, _ref, _ref1;
            _ref = getInfo(variableElement), variable = _ref[0], formulaType = _ref[1], formulaID = _ref[2];
            value = window.prompt("Enter a numerical value for this variable.", "1");
            if (/^\d+(\.\d+)?$/.test(value)) {
              _ref1 = makeEquation(variable, value), equationID = _ref1[0], equation = _ref1[1];
              if (numericalValues.getExpression(variable) != null) {
                return require(["frontend/rewrite"], function(rewrite) {
                  return rewrite.rewriteExpression(numericalValues.getExpression(variable), equation);
                });
              } else {
                return require(["frontend/addExpression"], function(addExpression) {
                  var eID;
                  eID = addExpression(equation);
                  return numericalValues.set(variable, value, eID);
                });
              }
            }
          }
        },
        "Delete formula": {
          click: function(variableElement) {
            var formulaID, formulaType, variable, _ref;
            _ref = getInfo(variableElement), variable = _ref[0], formulaType = _ref[1], formulaID = _ref[2];
            return $("#" + formulaType + "-" + formulaID).remove();
          }
        },
        "Convert to LaTeX code": {
          click: function(variableElement) {
            var formulaID, formulaType, variable, _ref;
            _ref = getInfo(variableElement), variable = _ref[0], formulaType = _ref[1], formulaID = _ref[2];
            if (formulaType === "expression") {
              return require(["backend/expressionIndex"], function(expressionIndex) {
                return window.prompt("LaTeX output.", expressionIndex.get(formulaID).toLaTeX());
              });
            } else if (formulaType === "equation") {
              return require(["backend/equationIndex"], function(equationIndex) {
                return window.prompt("LaTeX output.", equationIndex.get(formulaID).toLaTeX());
              });
            }
          }
        }
      }, {
        disable_native_context_menu: true,
        leftClick: false
      });
      if (element != null) {
        target = $(element).find(".equation, .expression").addBack(".equation, .expression");
      } else {
        target = $(".equation, .expression");
      }
      return target.contextMenu("context-menu-variable", {
        "Evaluate": {
          click: function(variableElement) {
            var formulaID, formulaType, _ref;
            _ref = variableElement.attr("id").split("-"), formulaType = _ref[0], formulaID = _ref[1];
            if (formulaType === "expression") {
              return require(["backend/expressionIndex", "frontend/addExpression", "backend/equivalenciesIndex"], function(expressionIndex, addExpression, equivalenciesIndex) {
                return addExpression(expressionIndex.get(formulaID).sub(numericalValues.getNumericalValues(), equivalenciesIndex));
              });
            } else if (formulaType === "equation") {
              return require(["backend/equationIndex", "frontend/addExpression", "backend/equivalenciesIndex"], function(equationIndex, addExpression, equivalenciesIndex) {
                return addExpression(equationIndex.get(formulaID).sub(numericalValues.getNumericalValues(), equivalenciesIndex));
              });
            }
          }
        },
        "Delete formula": {
          click: function(variableElement) {
            return variableElement.remove();
          }
        },
        "Convert to LaTeX code": {
          click: function(variableElement) {
            var formulaID, formulaType, _ref;
            _ref = variableElement.attr("id").split("-"), formulaType = _ref[0], formulaID = _ref[1];
            if (formulaType === "expression") {
              return require(["backend/expressionIndex"], function(expressionIndex) {
                return window.prompt("LaTeX output.", expressionIndex.get(formulaID).toLaTeX());
              });
            } else if (formulaType === "equation") {
              return require(["backend/equationIndex"], function(equationIndex) {
                return window.prompt("LaTeX output.", equationIndex.get(formulaID).toLaTeX());
              });
            }
          }
        }
      }, {
        disable_native_context_menu: true,
        leftClick: false
      });
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
          var draggableFormulaID, draggableFormulaType, draggableID, droppableFormulaID, droppableFormulaType, droppableID, _ref, _ref1;
          _ref = getInfo($(event.target)), droppableID = _ref[0], droppableFormulaType = _ref[1], droppableFormulaID = _ref[2];
          _ref1 = getInfo($(ui.draggable)), draggableID = _ref1[0], draggableFormulaType = _ref1[1], draggableFormulaID = _ref1[2];
          if (droppableFormulaType === "equation" && draggableFormulaType === "equation") {
            return require(["frontend/rewrite", "backend/equivalenciesIndex", "backend/equationIndex"], function(rewrite, equivalenciesIndex, equationIndex) {
              var aUnits, bUnits, expression, i, variableIDa, variableIDb, _i, _ref2, _ref3, _results;
              _ref2 = [droppableID, draggableID], variableIDa = _ref2[0], variableIDb = _ref2[1];
              console.log("getting units for " + variableIDa + " and " + variableIDb);
              aUnits = equationIndex.get(droppableFormulaID).getVariableUnits(variableIDa);
              bUnits = equationIndex.get(draggableFormulaID).getVariableUnits(variableIDb);
              console.log(aUnits, bUnits);
              if (((aUnits != null) && (bUnits != null) && aUnits.equals(bUnits)) || (aUnits === bUnits)) {
                connections.setEquivalency(variableIDa, variableIDb);
                _results = [];
                for (i = _i = 0, _ref3 = expressionIndex.size(); 0 <= _ref3 ? _i < _ref3 : _i > _ref3; i = 0 <= _ref3 ? ++_i : --_i) {
                  expression = expressionIndex.get(i);
                  _results.push(rewrite.rewriteExpression(i, expression.expandAndSimplify(equivalenciesIndex).simplify(equivalenciesIndex)));
                }
                return _results;
              } else {
                return alert(event.target, "Units do not match: " + variableIDa + " has units " + aUnits + ", " + variableIDb + " has units " + bUnits + ".");
              }
            });
          } else if (droppableFormulaType === "expression" && draggableFormulaType === "equation") {
            return substituteEquation(droppableFormulaID, draggableFormulaID, draggableID);
          }
        }
      });
    };
    getInfo = function(variableElement) {
      var formulaID, formulaNumber, formulaType, variable, _ref;
      variable = variableElement.attr("id");
      if (/variable-/.test(variable)) {
        variable = variable.split("-").slice(3).join("-");
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
      setVariableDraggables(element);
      return setContextMenus(element);
    };
  });

}).call(this);
