var FacebookEvent = Backbone.Model.extend({
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

var FacebookEventView = Backbone.View.extend({
    el: 'fbEvents',
    template: _.template($('#FBEventsTPL').html()),
    initialize: function() {
        var _this = this;

        this.model = new FacebookEvent();
        setTimeout(function() {
            _this.model.fetch();
            // setInterval(function() {
            //     _this.model.fetch();
            // }, 200);
        }, 1000);
    }
})