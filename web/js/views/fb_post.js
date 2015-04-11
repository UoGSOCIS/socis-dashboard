boneboiler.models.FacebookPost = Backbone.Model.extend({
    sync: function(method, model, options) {
        var _this = this;

        FB.getLoginStatus(function(response) {
            if (response.status === 'unknown') {        
                FB.login({scope: 'user_groups'});
            }

            //{ 'since': Date.now() } for prod
            FB.api('/' + boneboiler.config.fbGroupId + '/feed', 'get', function(resp) {
                _this.set({ 'posts': _.filter(resp.data, function(post) { return post.message; }) });
            });
        });
    },
});

boneboiler.views.FacebookPostView = Backbone.View.extend({
    initialize: function() {
        var _this = this;

        this.model = new boneboiler.models.FacebookPost();
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        var _this = this;

        this.$el.html(
            _.template($('#FBPostsTPL').html())({
                'posts': _this.model.get('posts')
            })
        );
    },
    update: function() {
        this.model.fetch();
    }
})