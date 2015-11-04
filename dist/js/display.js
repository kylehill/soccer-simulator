"use strict";

var simulate = function simulate() {
  var results = {
    home: 0,
    away: 0,
    draw: 0
  };

  var gameOptions = {
    scoringRatio: $(".js-scoring-ratio").val() / 100,
    homeGoals: $(".js-home-goals").val() / 100,
    homeAdvantage: $(".js-home-advantage").val() / 100,
    periods: $(".js-periods").val() * 1,

    extraTime: $(".js-extra-time").prop("checked"),
    extraPeriods: $(".js-extra-periods").val() * 1,
    penalties: $(".js-penalties").prop("checked")
  };

  for (var i = 0; i < 100000; i++) {
    var g = game(gameOptions);
    results[g.result]++;
  }

  $(".js-home-wins").text(Math.round(results.home / 10) / 100);
  $(".js-away-wins").text(Math.round(results.away / 10) / 100);
  $(".js-draws").text(Math.round(results.draw / 10) / 100);

  $(".result-row").removeClass("hidden");
};

$(function () {

  // Default values
  $(".js-scoring-ratio").val(50);
  $(".js-home-goals").val(50);
  $(".js-home-advantage").val(2);
  $(".js-periods").val(6);
  $(".js-extra-periods").val(2);

  $(".js-extra-time").on("click", function () {
    $(".toggle-row").toggleClass("hidden", !$(".js-extra-time").prop("checked"));
  });

  $(".js-simulate").on("click", simulate);
});