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
        var c, constant, d, fractional, n, p, power, v, variable, _ref, _ref1;
        if (typeof term === 'string' || (term instanceof String)) {
          constant = /^-?\d+(\.\d+)?$/;
          variable = /^[A-Za-z_]+$/;
          fractional = /^-?\d+(\.\d+)?\/\d+(\.\d+)?$/;
          power = /^[A-Za-z_]+\*\*-?\d+(\.\d+)?$/;
          if (term.match(constant) != null) {
            c = new Constant(parseFloat(term));
            c.simplify();
            return c;
          } else if (term.match(variable) != null) {
            return new Variable(term);
          } else if (term.match(fractional) != null) {
            _ref = term.split("/"), n = _ref[0], d = _ref[1];
            c = new Constant(parseFloat(n), parseFloat(d));
            c.simplify();
            return c;
          } else if (term.match(power) != null) {
            _ref1 = term.split("**"), v = _ref1[0], p = _ref1[1];
            return new Variable(v, parseFloat(p));
          } else {
            throw new Error("Invalid term in equation: " + term);
          }
        } else if (typeof term === 'number' || (term instanceof Number)) {
          c = new Constant(term);
          c.simplify();
          return c;
        } else if (term.isTerm != null) {
          return term.copy();
        } else {
          throw new TypeError("Expected Variable, Constant, number, or string, got: " + term);
        }
      };

      Equation.prototype.solve = function(variable) {
        var e, leftTerm, leftTerms, power, rightTerm, rightTerms, term, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;
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
        e = new Equation(leftTerms, rightTerms);
        return e.collectConstants();
      };

      Equation.prototype.collectConstants = function() {
        var a, constant, leftTerms, rightTerms, term, _i, _j, _len, _len1, _ref, _ref1;
        constant = new Constant(1);
        leftTerms = [];
        rightTerms = [];
        _ref = this.leftTerms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if (term.isConstant != null) {
            a = term.copy();
            a.pow(-1);
            constant = constant.multiply(a);
          } else {
            leftTerms.push(term);
          }
        }
        _ref1 = this.rightTerms;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          term = _ref1[_j];
          if (term.isConstant != null) {
            constant = constant.multiply(term);
          } else {
            rightTerms.push(term);
          }
        }
        constant.simplify();
        if (constant.evaluate() !== 1) {
          rightTerms.unshift(constant);
        }
        if (leftTerms.length === 0) {
          leftTerms.push(new Constant(1));
        }
        if (leftTerms.length === 0) {
          rightTerms.push(new Constant(1));
        }
        return new Equation(leftTerms, rightTerms);
      };

      Equation.prototype.sub = function(values) {
        var equation, leftConstant, leftTerms, rightConstant, rightTerms, term, v, _i, _j, _len, _len1, _ref, _ref1;
        leftTerms = [];
        leftConstant = null;
        _ref = this.leftTerms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if (term.isVariable != null) {
            if (term.label in values) {
              if (values[term.label].isConstant != null) {
                v = values[term.label].copy();
              } else {
                v = new Constant(values[term.label]);
              }
              v.pow(term.power);
              if (leftConstant != null) {
                leftConstant = leftConstant.multiply(v);
              } else {
                leftConstant = v;
              }
            } else {
              leftTerms.push(term);
            }
          } else if (term.isConstant != null) {
            if (leftConstant != null) {
              leftConstant = leftConstant.multiply(term);
            } else {
              leftConstant = term.copy();
            }
          }
        }
        rightTerms = [];
        rightConstant = null;
        _ref1 = this.rightTerms;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          term = _ref1[_j];
          if (term.isVariable != null) {
            if (term.label in values) {
              if (values[term.label].isConstant != null) {
                v = values[term.label].copy();
              } else {
                v = new Constant(values[term.label]);
              }
              v.pow(term.power);
              if (rightConstant != null) {
                rightConstant = rightConstant.multiply(v);
              } else {
                rightConstant = v;
              }
            } else {
              rightTerms.push(term);
            }
          } else if (term.isConstant != null) {
            if (rightConstant != null) {
              rightConstant = rightConstant.multiply(term);
            } else {
              rightConstant = term.copy();
            }
          }
        }
        if (leftTerms.length === 0 && rightTerms.length === 0 && (leftConstant != null) && (rightConstant != null)) {
          throw new AlgebraException("Inconsistent numbers substituted into equation.");
        }
        if (leftConstant != null) {
          leftTerms.unshift(leftConstant);
        }
        if (rightConstant != null) {
          rightTerms.unshift(rightConstant);
        }
        equation = new Equation(leftTerms, rightTerms);
        console.log(equation.toString());
        return equation.collectConstants();
      };

      Equation.prototype.evaluate = function(variable, values) {
        var f;
        if (values == null) {
          values = null;
        }
        if (values != null) {
          f = this.solve(variable).sub(values);
        } else {
          f = this.solve(variable);
        }
        if (f.rightTerms.length === 1 && (f.rightTerms[0].isConstant != null)) {
          return f.rightTerms[0].evaluate();
        } else {
          return f;
        }
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

      Equation.prototype.toHTML = function(equationID, expression) {
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

      Equation.prototype.toMathML = function(equationID, expression) {
        var html, leftSide, leftTermsBottom, leftTermsLeft, leftTermsTop, mathClass, mathID, p, rightSide, rightTermsBottom, rightTermsLeft, rightTermsTop, term, varOutput, _i, _j, _len, _len1, _ref, _ref1;
        if (expression == null) {
          expression = false;
        }
        if (!expression) {
          mathClass = "equation";
          if (equationID != null) {
            mathID = "equation-" + equationID;
          } else {
            mathID = "equation";
          }
        } else {
          mathClass = "expression";
          if (equationID != null) {
            mathID = "expression-" + equationID;
          } else {
            mathID = "expression";
          }
        }
        html = '<div id="' + mathID + '" class="' + mathClass + '"><math xmlns="http://www.w3.org/1998/Math/MathML">';
        leftTermsLeft = [];
        leftTermsTop = [];
        leftTermsBottom = [];
        _ref = this.leftTerms;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if (term.isVariable != null) {
            if (term.power === 0) {

            } else {
              if (term.power > 0) {
                if (term.power === 1) {
                  varOutput = '<mi class="variable">' + term.label + "</mi>";
                } else if (term.power > 0) {
                  varOutput = '<msup><mi class="variable">' + term.label + "</mi><mn>" + term.power + "</mn></msup>";
                }
                leftTermsTop.push(varOutput);
              } else {
                p = -term.power;
                if (p === 1) {
                  varOutput = '<mi class="variable">' + term.label + "</mi>";
                } else if (p > 0) {
                  varOutput = '<msup><mi class="variable">' + term.label + "</mi><mn>" + p + "</mn></msup>";
                }
                leftTermsBottom.push(varOutput);
              }
            }
          } else {
            leftTermsLeft.push(term.toMathML());
          }
        }
        rightTermsLeft = [];
        rightTermsTop = [];
        rightTermsBottom = [];
        _ref1 = this.rightTerms;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          term = _ref1[_j];
          if (term.isVariable != null) {
            if (term.power === 0) {

            } else {
              if (term.power > 0) {
                if (term.power === 1) {
                  varOutput = '<mi class="variable">' + term.label + "</mi>";
                } else if (term.power > 0) {
                  varOutput = '<msup><mi class="variable">' + term.label + "</mi><mn>" + term.power + "</mn></msup>";
                }
                rightTermsTop.push(varOutput);
              } else {
                p = -term.power;
                if (p === 1) {
                  varOutput = '<mi class="variable">' + term.label + "</mi>";
                } else if (p > 0) {
                  varOutput = '<msup><mi class="variable">' + term.label + "</mi><mn>" + p + "</mn></msup>";
                }
                rightTermsBottom.push(varOutput);
              }
            }
          } else {
            rightTermsLeft.push(term.toMathML());
          }
        }
        leftSide = [];
        if (leftTermsLeft.length > 0) {
          leftSide.push(leftTermsLeft.join("<mo>&times;</mo>"));
        }
        if (leftTermsTop.length > 0 && leftTermsBottom.length > 0) {
          leftSide.push("<mfrac><mrow>" + leftTermsTop.join("<mo>&times;</mo>") + "</mrow><mrow>" + leftTermsBottom.join("<mo>&times;</mo>") + "</mrow></mfrac>");
        } else if (leftTermsTop.length > 0) {
          leftSide.push(leftTermsTop.join("<mo>&times;</mo>"));
        } else if (leftTermsBottom.length > 0) {
          leftSide.push("<mfrac><mrow>1</mrow><mrow>" + leftTermsBottom.join("<mo>&times;</mo>") + "</mrow></mfrac>");
        }
        html += leftSide.join("<mo>&times;</mo>") + "<mo>=</mo>";
        rightSide = [];
        if (rightTermsLeft.length > 0) {
          rightSide.push(rightTermsLeft.join("<mo>&times;</mo>"));
        }
        if (rightTermsTop.length > 0 && rightTermsBottom.length > 0) {
          rightSide.push("<mfrac><mrow>" + rightTermsTop.join("<mo>&times;</mo>") + "</mrow><mrow>" + rightTermsBottom.join("<mo>&times;</mo>") + "</mrow></mfrac>");
        } else if (rightTermsTop.length > 0) {
          rightSide.push(rightTermsTop.join("<mo>&times;</mo>"));
        } else if (rightTermsBottom.length > 0) {
          rightSide.push("<mfrac><mrow>1</mrow><mrow>" + rightTermsBottom.join("<mo>&times;</mo>") + "</mrow></mfrac>");
        }
        html += rightSide.join("<mo>&times;</mo>") + "</math>";
        return html;
      };

      return Equation;

    })();
  });

}).call(this);
