// Example card that pulls Facebook posts from the SOCIS group 

// This is a Backbone model that is used to hold the data that is received from Facebook
boneboiler.models.FacebookPost = Backbone.Model.extend({
    sync: function(method, model, options) {
        var _this = this;

        // Check whether we are logged in to Facebook
        FB.getLoginStatus(function(response) {
            // If we are not request an auth token for our Facebook application
            if (response.status === 'unknown') {        
                FB.login({scope: 'user_groups'});
            }

            // Send a GET request to the FB group posts endpoint
            FB.api('/' + boneboiler.config.fbGroupId + '/feed', 'get', function(resp) {
                // Set the model's data to what we received from Facebook but only keep posts that have a message (some don't)
                _this.set({ 
                    'posts': _.filter(resp.data, function(post) { 
                        return post.message; 
                    }) 
                });
            });
        });
    },
});

boneboiler.views.FacebookPostView = Backbone.View.extend({
    initialize: function() {
        var _this = this;

        // Instatiate the model and render when the model's change event is fired
        this.model = new boneboiler.models.FacebookPost();
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        var _this = this;

        // Render the template with our model's data
        this.$el.html(
            _.template($('#FBPostsTPL').html())({
                'posts': _this.model.get('posts')
            })
        );
    },
    // This update function defines how the model is updated by its parent card. This is called every n milliseconds 
    update: function() {
        // Simply run our model's sync function 
        this.model.fetch();
    }
})