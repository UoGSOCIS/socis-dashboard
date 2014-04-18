require.config({
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js',
    gapi: 'https://apis.google.com/js/client.js'
  }
});

require([
  'views/gcal-feed'
], function(GCalView) {
  var gcalView = new GCalView();
  gcalView.render();
});