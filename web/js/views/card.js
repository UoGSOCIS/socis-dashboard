// Main card interface
boneboiler.views.card = Backbone.View.extend({
   tagName: 'div',
   className: 'card',
   template: _.template($('#cardTPL').html()),
   initialize: function(options) {
        var _this = this;
        $.extend(this, options);

        this.className += ' col-md-' + (this.width || 4);
        // Default update interal of 2 minutes
        this.interval = this.interval || 120000;
        this.render();

        // If a inner child view was defined render it in the panel-body and setup its update function
        if (this.child) {   
            this.child = new this.child({ el: this.$el.find('.panel-body') });    

            // Force the first update of the child view and set an interval that updates the child every n milliseconds
            this.child.update();
            setInterval(function() {
                console.log('Updating card')
                _this.child.update()
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