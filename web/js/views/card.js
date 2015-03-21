boneboiler.views.card = Backbone.View.extend({
   tagName: 'div',
   className: 'card',
   template: _.template($('#cardTPL').html()),
   initialize: function(options) {
        var _this = this;
        $.extend(this, options);

        this.className += ' col-md-' + (this.width || 4);
        this.interval = this.interval || 200;
        this.render();

        if (this.child) {   
            this.child = new this.child({ el: this.$el.find('.panel-body') });    

            this.child.update();
            setInterval(function() {
                // _this.child.update()
            }, this.interval);
        }
   },
   render: function() {
        this.$el.html(this.template({
            'title': this.title,
        }));
        this.$el.attr('class', this.className);
        $('#dashboard').append(this.el);
   },
});