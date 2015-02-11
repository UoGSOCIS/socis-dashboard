boneboiler.views.card = Backbone.View.extend({
   tagName: 'div',
   className: 'card',
   template: _.template($('#cardTPL').html()),
   initialize: function(options) {
        $.extend(this, options);
        console.log(this);
        this.className += ' col-md-' + (this.width || 2);
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