'use strict';
var Alexa = require('alexa-sdk');
var _ = require('lodash');

var APP_ID = 'amzn1.ask.skill.315406cb-283f-42d0-90f5-89bbd210d0f5';

var SKILL_NAME = "YouTube Masters";
var GET_FACT_MESSAGE = "One of my favorite YouTubers is ";
var LIST_FACT_MESSAGE = "The top youtubers are ";
var HELP_MESSAGE = "You can say who is your favorite YouTube Master... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

var data = [
  "Jack T Y M",
  "Jack T Y M",
  "Puppy Love 2006",
  "Puppy Love 2006",
  "Banana Man",
  "DanTDM",
  "matthew mitchi",
  "PopularMMOs",
  "PewDiePie"
];

var handlers = {
  'LaunchRequest': function() {
    this.emit('GetNewYouTubeMasterIntent');
  },
  'GetNewYouTubeMasterIntent': function() {
    var factIndex = Math.floor(Math.random() * data.length);
    var randomFact = data[factIndex];
    var speechOutput = GET_FACT_MESSAGE + randomFact;
    this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
  },
  'ListYouTubeMasterIntent': function() {
    var list = _.uniq(data).join(',');
    var speechOutput = LIST_FACT_MESSAGE + list;
    this.emit(':tellWithCard', speechOutput, SKILL_NAME, list)
  }, 'AMAZON.HelpIntent': function() {
    var speechOutput = HELP_MESSAGE;
    var reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', STOP_MESSAGE);
  }
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

