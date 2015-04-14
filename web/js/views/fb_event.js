// Example card that pulls Facebook events from the SOCIS group 

// This is a Backbone model that is used to hold the data that is received from Facebook
boneboiler.models.FacebookEvents = Backbone.Model.extend({
    // Overwritten sync function since we are not using a standard REST architecture to talk to Facebook
    sync: function(method, model, options) {
        var _this = this;

        // Check whether we are logged in to Facebook
        FB.getLoginStatus(function(response) {
            // If we are not request an auth token for our Facebook application
            if (response.status === 'unknown') {        
                FB.login({scope: 'user_groups'});
            }

            // Send a GET request to the FB group events endpoint
            // Currently we pull all event past and future but in production we should only pull upcoming events
            FB.api('/' + boneboiler.config.fbGroupId + '/events', 'get', function(resp) {
                // The reponse gives us some basic data about an event but not enough so for each event that we receive 
                // we must call a GET on that event to get all of the event info. _.map is used to return an array of 
                // the extended events 
                var expandedEvents = _.map(resp.data, function(el) {
                    FB.api('/' + el.id, 'get', function(response) {
                        // Once we have the detailed event info extend the basic object with the detailed information
                        _.extend(el, response);
                    });
                    return el;
                });
                // Set the model's data to the data we received from Facebook
                _this.set({ 'events': expandedEvents });
            });
        });
    },
});

boneboiler.views.FacebookEventView = Backbone.View.extend({
    initialize: function() {
        var _this = this;

        // Instatiate the model and render when the model's change event is fired
        this.model = new boneboiler.models.FacebookEvents();
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        var _this = this;

        // Render the template with our model's data
        this.$el.html(
            _.template($('#FBEventsTPL').html())({
                'events': _this.model.get('events')
            })
        );
    },
    // This update function defines how the model is updated by its parent card. This is called every n milliseconds 
    update: function() {
        // Simply run our model's sync function 
        this.model.fetch();
    }
})