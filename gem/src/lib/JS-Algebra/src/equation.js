// Generated by CoffeeScript 1.6.3
(function() {
  define(["JSAlgebra/variable", "JSAlgebra/constant", "JSAlgebra/algebraException"], function(Variable, Constant, AlgebraException) {
    var Equation;
    return Equation = (function() {
      function Equation(leftTerms, rightTerms) {
        var term, _i, _j, _len, _len1;
        this.leftTerms = [];
        this.rightTerms = [];
        for (_i = 0, _len = leftTerms.length; _i < _len; _i++) {
          term = leftTerms[_i];
          this.leftTerms.push(Equation.handleInputTerm(term));
        }
        for (_j = 0, _len1 = rightTerms.length; _j < _len1; _j++) {
          term = rightTerms[_j];
          this.rightTerms.push(Equation.handleInputTerm(term));
        }
      }

      Equation.handleInputTerm = function(term) {
        var constant, d, fractional, n, p, power, v, variable, _ref, _ref1;
        if (typeof term === 'string' || (term instanceof String)) {
          constant = /^\d+(\.\d+)?$/;
          variable = /^[A-Za-z_]+$/;
          fractional = /^\d+(\.\d+)?\/\d+(\.\d+)?$/;
          power = /^[A-Za-z_]+\*\*\d+(\.\d+)?$/;
          if (term.match(constant) != null) {
            return new Constant(parseFloat(term));
          } else if (term.match(variable) != null) {
            return new Variable(term);
          } else if (term.match(fractional) != null) {
            _ref = term.split("/"), n = _ref[0], d = _ref[1];
            return new Constant(parseFloat(n), parseFloat(d));
          } else if (term.match(power) != null) {
            _ref1 = term.split("**"), v = _ref1[0], p = _ref1[1];
            return new Variable(v, p);
          } else {
            throw new Error("Invalid term in equation: " + term);
          }
        } else if (term.isTerm != null) {
          return term;
        } else {
          throw new TypeError("Expected Variable, Constant, or string, got: " + term);
        }
      };

      Equation.prototype.solve = function(variable) {
        var leftTerm, leftTerms, power, rightTerm, rightTerms, term, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;
        leftTerms = [];
        rightTerms = [];
        _ref = this.leftTerms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if ((term.isVariable != null) && term.label === variable) {
            leftTerm = term.copy();
            leftTerms.push(leftTerm);
          } else {
            rightTerm = term.copy();
            rightTerm.pow(-1);
            rightTerms.push(rightTerm);
          }
        }
        _ref1 = this.rightTerms;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          term = _ref1[_j];
          if ((term.isVariable != null) && term.label === variable) {
            leftTerm = term.copy();
            leftTerm.pow(-1);
            leftTerms.push(leftTerm);
          } else {
            rightTerm = term.copy();
            rightTerms.push(rightTerm);
          }
        }
        if (leftTerms.length === 0) {
          throw new AlgebraException("Variable to solve for was not in equation.");
        }
        power = 1;
        for (_k = 0, _len2 = leftTerms.length; _k < _len2; _k++) {
          term = leftTerms[_k];
          power = term.power;
        }
        for (_l = 0, _len3 = leftTerms.length; _l < _len3; _l++) {
          term = leftTerms[_l];
          term.pow(1 / power);
        }
        for (_m = 0, _len4 = rightTerms.length; _m < _len4; _m++) {
          term = rightTerms[_m];
          term.pow(1 / power);
        }
        return new Equation(leftTerms, rightTerms);
      };

      Equation.prototype.toString = function() {
        var leftHandSide, output, rightHandSide, term, _i, _j, _len, _len1, _ref, _ref1;
        output = [];
        _ref = this.leftTerms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if ((term.isVariable != null) && term.power === 0) {

          } else {
            output.push(term.toString());
          }
        }
        leftHandSide = output.join(" * ");
        output = [];
        _ref1 = this.rightTerms;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          term = _ref1[_j];
          if ((term.isVariable != null) && term.power === 0) {

          } else {
            output.push(term.toString());
          }
        }
        rightHandSide = output.join(" * ");
        return leftHandSide + " = " + rightHandSide;
      };

      Equation.prototype.toGEMHTML = function(equationID, expression) {
        var divClass, divID, html, leftTerms, power, rightTerms, term, _i, _j, _len, _len1, _ref, _ref1;
        if (expression == null) {
          expression = false;
        }
        if (!expression) {
          divClass = "equation";
          if (equationID != null) {
            divID = "equation-" + equationID;
          } else {
            divID = "equation";
          }
        } else {
          divClass = "expression";
          if (equationID != null) {
            divID = "expression-" + equationID;
          } else {
            divID = "expression";
          }
        }
        html = '<div id="' + divID + '" class="' + divClass + '">';
        leftTerms = [];
        _ref = this.leftTerms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if (term.isVariable != null) {
            if (term.power === 0) {

            } else {
              if (term.power === 1) {
                power = "";
              } else {
                power = "**" + term.power;
              }
              leftTerms.push('<span class="variable">' + term.label + '</span>' + power);
            }
          } else {
            leftTerms.push(term);
          }
        }
        rightTerms = [];
        _ref1 = this.rightTerms;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          term = _ref1[_j];
          if (term.isVariable != null) {
            if (term.power === 0) {

            } else {
              if (term.power === 1) {
                power = "";
              } else {
                power = "**" + term.power;
              }
              rightTerms.push('<span class="variable">' + term.label + '</span>' + power);
            }
          } else {
            rightTerms.push(term);
          }
        }
        html += leftTerms.join(" * ") + " = " + rightTerms.join(" * ") + "</div>";
        return html;
      };

      return Equation;

    })();
  });

}).call(this);