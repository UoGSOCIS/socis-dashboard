boneboiler.views.card = Backbone.View.extend({
   tagName: 'div',
   className: 'card',
   template: _.template($('#cardTPL').html()),
   initialize: function(options) {
        $.extend(this, options);
        this.className += ' col-md-' + (this.width || 4);
        this.render();
   },
   render: function() {
        this.$el.html(this.template({
            'title': this.title,
        }));
        this.$el.attr('class', this.className);
        $('#dashboard').append(this.el);
   }
});