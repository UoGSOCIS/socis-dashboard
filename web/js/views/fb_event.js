boneboiler.models.FacebookEvent = Backbone.Model.extend({
    sync: function(method, model, options) {
        var _this = this;

        FB.getLoginStatus(function(response) {
            if (response.status === 'unknown') {        
                FB.login({scope: 'user_groups'});
            }

            FB.api('/' + boneboiler.config.fbGroupId + '/feed?fields', 'get', function(resp) {
                console.log(resp)
            })
        });
    },
});

boneboiler.views.FacebookEventView = Backbone.View.extend({
    el: '.panel-body',
    template: _.template($('#FBEventsTPL').html()),
    initialize: function() {
        var _this = this;
        this.model = new boneboiler.models.FacebookEvent();
    },
    update: function() {
        this.model.fetch();
    }
})