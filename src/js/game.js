;(function(){

  const setOptions = function(optionsObject, defaultKeyValues) {

    for (let key in defaultKeyValues) {
      if (!optionsObject.hasOwnProperty(key)) {
        optionsObject[key] = defaultKeyValues[key]
      }
    }

    return optionsObject
  }

  var simulatePeriod = function(options) {
    let homeGoals = 0, awayGoals = 0
    const target = (options.homeGoals + options.homeAdvantage)

    while (true) {
      if (Math.random() > options.scoringRatio) {
        return { home: homeGoals, away: awayGoals }
      }

      if (Math.random() <= target) {
        homeGoals++
      }
      else {
        awayGoals++
      }
    }
  }

  var game = function(options) {
    options = setOptions(options || {}, {
      periods: 6,
      scoringRatio: .5,
      homeGoals: .5,
      homeAdvantage: 0,
      extraTime: false,
      extraRolls: 2,
      penalties: false
    })

    let home = 0, away = 0, rolls = 0

    while (rolls < options.periods) {
      var simulated = simulatePeriod(options)
      home += simulated.home
      away += simulated.away
      rolls++
    }

    if (home === away && options.extraTime) {
      rolls = 0
      while (rolls < options.extraPeriods) {
        var simulated = simulatePeriod(options)
        home += simulated.home
        away += simulated.away
        rolls++
      }
    }

    let result
    if (home === away) {
      result = "draw"
    }
    if (home > away) {
      result = "home"
    }
    if (home < away) {
      result = "away"
    }

    if (home === away && options.penalties) {
      result = (Math.random() > .5 ? "home" : "away")
    }

    return {
      home: home,
      away: away,
      result: result
    }
  }

  const PackageDefinition = game
  const PackageName = "game"

  if ("undefined" !== typeof(exports)) module.exports = PackageDefinition
  else if ("function" === typeof(define) && define.amd) {
    define(PackageName, function() { return PackageDefinition })
  } else {
    window[PackageName] = PackageDefinition
  }

})()