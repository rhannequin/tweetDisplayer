define(["app/models/Tweet", "text!app/views/template.html",], function(Tweet, tmpl) {

  return Backbone.View.extend({

    el: '#tweet',

    initialize: function() {
      _.bindAll(this, 'render');
      this.tmpl = _.template(tmpl);
      this.model = new Tweet();

      this.model.on('change', this._onModelChange, this);
    },
    _onModelChange: function() {
      this.render();
    },

    render: function( event ){
      this.$el.html(this.tmpl(this.model.toJSON()));
      return this;
    },

    events: {

    },

    setModel: function (params) {
      var results = params.results;
      this.model.set(this.model.fromApi(results));
      return this;
    }

  });

});