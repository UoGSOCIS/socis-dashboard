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
                _this.set(firstThree);
            });
        });
    },
});

boneboiler.views.FacebookEventView = Backbone.View.extend({
    el: '.panel-body',
    template: _.template($('#FBEventsTPL').html()),
    initialize: function() {
        var _this = this;
        this.model = new boneboiler.models.FacebookEvents();
    },
    update: function() {
        this.model.fetch();
        console.log(this.model);
    }
})