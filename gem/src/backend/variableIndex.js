// Generated by CoffeeScript 1.6.3
(function() {
  define(function() {
    var variableLabels, variables;
    variables = {};
    variableLabels = {};
    return {
      add: function(variableID, name) {
        return variables[variableID] = name;
      },
      get: function(variableID) {
        return variables[variableID];
      },
      getLabelCount: function(label) {
        var count;
        count = variableLabels[label];
        if (count != null) {
          return count;
        }
        return 0;
      },
      incrementLabelCount: function(label) {
        if (label in variableLabels) {
          return variableLabels[label] += 1;
        } else {
          return variableLabels[label] = 0;
        }
      },
      getNextUniqueID: function(label) {
        var variableID;
        this.incrementLabelCount(label);
        variableID = label + "-" + this.getLabelCount(label);
        this.add(variableID, label);
        return variableID;
      }
    };
  });

}).call(this);