define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var Events = Backbone.Collection.extend({
    url: function() {
      return 'https://www.googleapis.com/calendar/v3/calendars/' + calID +'/events?maxResults=4&singleEvents=true&key=' + apiKey;
    },
    parse: function(resp, xhr) {
      console.log(resp);
      return resp.items;
    },
    calID: 'socis.ca_h8qcn7cgvfvpqgii9jkilb00r8%40group.calendar.google.com'
  });

  return Events;
});