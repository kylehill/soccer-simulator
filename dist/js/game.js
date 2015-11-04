"use strict";

;(function () {

  var setOptions = function setOptions(optionsObject, defaultKeyValues) {

    for (var key in defaultKeyValues) {
      if (!optionsObject.hasOwnProperty(key)) {
        optionsObject[key] = defaultKeyValues[key];
      }
    }

    return optionsObject;
  };

  var simulatePeriod = function simulatePeriod(options) {
    var homeGoals = 0,
        awayGoals = 0;
    var target = options.homeGoals + options.homeAdvantage;

    while (true) {
      if (Math.random() > options.scoringRatio) {
        return { home: homeGoals, away: awayGoals };
      }

      if (Math.random() <= target) {
        homeGoals++;
      } else {
        awayGoals++;
      }
    }
  };

  var game = function game(options) {
    options = setOptions(options || {}, {
      periods: 6,
      scoringRatio: .5,
      homeGoals: .5,
      homeAdvantage: 0,
      extraTime: false,
      extraRolls: 2,
      penalties: false
    });

    var home = 0,
        away = 0,
        rolls = 0;

    while (rolls < options.periods) {
      var simulated = simulatePeriod(options);
      home += simulated.home;
      away += simulated.away;
      rolls++;
    }

    if (home === away && options.extraTime) {
      rolls = 0;
      while (rolls < options.extraPeriods) {
        var simulated = simulatePeriod(options);
        home += simulated.home;
        away += simulated.away;
        rolls++;
      }
    }

    var result = undefined;
    if (home === away) {
      result = "draw";
    }
    if (home > away) {
      result = "home";
    }
    if (home < away) {
      result = "away";
    }

    if (home === away && options.penalties) {
      result = Math.random() > .5 ? "home" : "away";
    }

    return {
      home: home,
      away: away,
      result: result
    };
  };

  var PackageDefinition = game;
  var PackageName = "game";

  if ("undefined" !== typeof exports) module.exports = PackageDefinition;else if ("function" === typeof define && define.amd) {
    define(PackageName, function () {
      return PackageDefinition;
    });
  } else {
    window[PackageName] = PackageDefinition;
  }
})();