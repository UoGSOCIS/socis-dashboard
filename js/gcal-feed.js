(function ($, Backbone) {
  var clientID = '893172756640-ouu4h990t4vsq0mvuevv5grcs9bge18b.apps.googleusercontent.com'
  var apiKey = 'AIzaSyBwD1kBCk6ktJrmuogShXJlFM7ZQ4T-bs0'
  var scopes = 'https://www.googleapis.com/auth/calendar.readonly'

  var Events = Backbone.Collection.extend({
    url: function() {
      return 'https://www.googleapis.com/calendar/v3/calendars/' + calID +'/events?maxResults=4&singleEvents=true&key=' + apiKey
    },
    parse: function(resp, xhr) {
      console.log(resp)
      return resp.items
    },
    calID: 'socis.ca_h8qcn7cgvfvpqgii9jkilb00r8%40group.calendar.google.com'
  })

  EventView = Backbone.View.extend({
    el: $("#events"),
    initialize: function () {
      gapi.client.setApiKey(apiKey)
      gapi.auth.authorize({client_id: clientID, scope: scopes, immediate: true}, handleAuthResult);
      this.eventCollection = new Events()
    },

    render: function() {
      var that = this

      this.eventCollection.fetch({
        success: function(events) {
          console.log(events)
        }
      })
    },

    handleAuthResult: function (authResult) {
      console.log(authResult)
      var authorizeButton = document.getElementById('auth')
      var dashboard = document.getElementById('dash')
      if (authResult && !authResult.error) {
        dashboard.style.display = 'block'
        authorizeButton.style.display = 'none'
        console.log('authorized')
      } else {
        console.log('couldn\'t auth')
        dashboard.style.display = 'none'
        authorizeButton.style.display = 'block'
        authorizeButton.onclick = authClick
      }
    },

    authClick: function (event) {
      gapi.auth.authorize({client_id: clientID, scope: scopes, immediate: false}, handleAuthResult);
      return false;
    }
  })
}) (jQuery);