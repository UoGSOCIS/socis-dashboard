var FacebookEvent = Backbone.Model.extend({

});

var FacebookEventView = Backbone.View.extend({
    el: 'fbEvents',
    template: _.template($('#FBEventsTPL').html()),
    initialize: function() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '801617349917144',
                xfbml      : true,
                version    : 'v2.1'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
})