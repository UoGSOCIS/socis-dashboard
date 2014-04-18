var clientID = '893172756640-ouu4h990t4vsq0mvuevv5grcs9bge18b.apps.googleusercontent.com'
var apiKey = 'AIzaSyBwD1kBCk6ktJrmuogShXJlFM7ZQ4T-bs0'
var scopes = 'https://www.googleapis.com/auth/calendar.readonly'

function appendResults (text) {
  var results = document.getElementById('results')
  results.appendChild(document.createElement('P'))
  results.appendChild(document.createTextNode(text))
}

function makeRequest() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'socis.ca_h8qcn7cgvfvpqgii9jkilb00r8@group.calendar.google.com',
      'maxResults': 4,
      'singleEvents': true
    })
    request.execute(function(resp) {
      console.log(resp)
    })
  })
}

function handleAuthResult (authResult) {
  console.log(authResult)
  var authorizeButton = document.getElementById('auth')
  var dashboard = document.getElementById('dash')
  if (authResult && !authResult.error) {
    dashboard.style.display = 'block'
    authorizeButton.style.display = 'none'
    console.log('authorized')
    makeRequest()
  } else {
    console.log('couldn\'t auth')
    gapi.auth.authorize({client_id: clientID, scope: scopes, immediate: false}, handleAuthResult);
    dashboard.style.display = 'none'
    authorizeButton.style.display = 'block'
    authorizeButton.onclick = authClick
  }
}

function authClick (event) {
  gapi.auth.authorize({client_id: clientID, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

function load() {
  gapi.client.setApiKey(apiKey)
  gapi.auth.authorize({client_id: clientID, scope: scopes, immediate: true}, handleAuthResult);
}