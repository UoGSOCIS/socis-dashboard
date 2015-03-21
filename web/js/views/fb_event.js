boneboiler.models.FacebookEvents = Backbone.Model.extend({
    sync: function(method, model, options) {
        var _this = this;

        FB.getLoginStatus(function(response) {
            if (response.status === 'unknown') {        
                FB.login({scope: 'user_groups'});
            }

            //{ 'since': Date.now() } for prod
            FB.api('/' + boneboiler.config.fbGroupId + '/events', 'get', function(resp) {
                var firstThree = _.map(resp.data.slice(0,3), function(el) {
                    FB.api('/' + el.id, 'get', function(response) {
                        _.extend(el, response);
                    });
                    return el;
                });
                _this.set({ 'events': firstThree });
            });
        });
    },
});

boneboiler.views.FacebookEventView = Backbone.View.extend({
    initialize: function() {
        var _this = this;

        this.model = new boneboiler.models.FacebookEvents();
        this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
        var _this = this;

        this.$el.html(
            _.template($('#FBEventsTPL').html())({
                'events': _this.model.get('events')
            })
        );
    },
    update: function() {
        this.model.fetch();
    }
})