// Generated by CoffeeScript 1.6.3
(function() {
  define(["coffeequate"], function(coffeequate) {
    var formulae;
    formulae = {
      "force": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "m::{kg} * a::{m * s**-2}");
      },
      "centripetal-force": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "m::{kg} * v::{m * s**-1}**2 * r::{m}**-1");
      },
      "friction-force": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "μ * N::{kg * m * s**-2}");
      },
      "drag-force": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "1/2 * ρ::{kg * m**-3} * A::{m**2} * C * v::{m * s**-1}**2");
      },
      "torque": function() {
        return new coffeequate.Equation("τ::{kg * m**2 * s**-2}", "F::{kg * m * s**-2} * dperpendicular::{m}");
      },
      "gravitational-force": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "\\G * m::{kg} * M::{kg} * r::{m}**-2");
      },
      "gravitational-force-simple": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "m::{kg} * g::{m * s**-2}");
      },
      "gravitational-potential-energy": function() {
        return new coffeequate.Equation("Ep::{kg * m**2 * s**-2}", "-1 * \\G * m::{kg} * M::{kg} * r::{m}**-1");
      },
      "gravitational-potential-energy-simple": function() {
        return new coffeequate.Equation("Ep::{kg * m**2 * s**-2}", "m::{kg} * g::{m * s**-2} * h::{m}");
      },
      "spring-force": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "-k::{kg * s**-2} * D::{m}");
      },
      "spring-energy": function() {
        return new coffeequate.Equation("E::{kg * m**2 * s**-2}", "1/2 * k::{kg * s**-2} * D::{m}**2");
      },
      "momentum": function() {
        return new coffeequate.Equation("p::{kg * m * s**-1}", "m::{kg} * v::{m * s**-1}");
      },
      "angular-momentum": function() {
        return new coffeequate.Equation("L::{kg * m**2 * s**-1}", "I::{kg * m**2} * ω::{s**-1}");
      },
      "moment-of-inertia-disk": function() {
        return new coffeequate.Equation("I::{kg * m**2}", "1/2 * m::{kg} * R::{m}**2");
      },
      "moment-of-inertia-point": function() {
        return new coffeequate.Equation("I::{kg * m**2}", "m::{kg} * R::{m}**2");
      },
      "projectile-motion": function() {
        return new coffeequate.Equation("s::{m}", "u::{m * s**-1} * t::{s} + 1/2 * a::{m * s**-2} * t::{s}**2");
      },
      "projectile-velocity": function() {
        return new coffeequate.Equation("v::{m * s**-1}", "u::{m * s**-1} + a::{m * s**-2} * t::{s}");
      },
      "projectile-velocity-squared": function() {
        return new coffeequate.Equation("v::{m * s**-1}", "(u::{m * s**-1}**2 + 2 * a::{m * s**-2} * s::{m})**1/2");
      },
      "differential-velocity": function() {
        return new coffeequate.Equation("a::{m * s**-2}", "@v::{m * s**-2}");
      },
      "distance-over-time": function() {
        return new coffeequate.Equation("v::{m * s**-1}", "d::{m} * t::{s}**-1");
      },
      "velocity-over-time": function() {
        return new coffeequate.Equation("a::{m * s**-2}", "v::{m * s**-1} * t::{s}**-1");
      },
      "angular-velocity": function() {
        return new coffeequate.Equation("v::{m * s**-1}", "r::{m} * ω::{s**-1}");
      },
      "kinetic-energy": function() {
        return new coffeequate.Equation("Ek::{kg * m**2 * s**-2}", "m::{kg} * v::{m * s**-1}**2 * 1/2");
      },
      "energy-mass-relation": function() {
        return new coffeequate.Equation("E::{kg * m**2 * s**-2}", "m::{kg} * \\c ** 2");
      },
      "rotational-energy": function() {
        return new coffeequate.Equation("E::{kg * m**2 * s**-2}", "I::{kg * m**2} * ω::{s**-1}**2");
      },
      "heat-energy": function() {
        return new coffeequate.Equation("EH::{kg * m**2 * s**-2}", "c::{m * s**-2 * K**-1} * m::{kg} * ΔT::{K}");
      },
      "black-body-radiation-power": function() {
        return new coffeequate.Equation("P::{kg * m**2 * s**-3}", "A::{m**2} * \\σ * T::{K}**4");
      },
      "heat-flow-through-insulator": function() {
        return new coffeequate.Equation("P::{kg * m**2 * s**-3}", "A::{m**2} * ΔT::{K} * R::{kg**-1 * s**3 * K}");
      },
      "volume-density": function() {
        return new coffeequate.Equation("ρ::{kg * m**-3}", "m::{kg} * V::{m**3}**-1");
      },
      "coulombs-law": function() {
        return new coffeequate.Equation("F::{kg * m * s**-2}", "(4 * \\π * \\ε0)**-1 * q1::{A * s} * q2::{A * s} * r::{m}**2");
      },
      "electric-field-strength": function() {
        return new coffeequate.Equation("E::{kg * m * s**-3 * A}", "F::{kg * m * s**-2} * q::{A * s}**-1");
      },
      "radius-circumference": function() {
        return new coffeequate.Equation("c::{m}", "2 * \\π * r::{m}");
      },
      "circle-area": function() {
        return new coffeequate.Equation("A::{m**2}", "\\π * r::{m}**2");
      },
      "rectangle-area": function() {
        return new coffeequate.Equation("A::{m**2}", "w::{m} * l::{m}");
      },
      "prism-volume": function() {
        return new coffeequate.Equation("V::{m**3}", "A::{m**2} * h::{m}");
      }
    };
    return {
      get: function(name) {
        if (name in formulae) {
          console.log(formulae[name]());
          return formulae[name]();
        } else {
          throw new Error("No formula called " + name + " exists.");
        }
      },
      getAllFormulaNames: function() {
        var formula, names;
        names = [];
        for (formula in formulae) {
          names.push(formula);
        }
        return names;
      },
      makeEquation: function(left, right) {
        return new coffeequate.Equation(left, right);
      },
      makeExpression: function(right) {
        return new coffeequate.parse.stringToExpression(right);
      }
    };
  });

}).call(this);
