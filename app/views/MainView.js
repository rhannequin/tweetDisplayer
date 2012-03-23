define(["use!backbone", "app/views/TweetView"], function(Backbone, TweetView) {

  return Backbone.View.extend({

    el: 'body',

    initialize: function() {
      _.bindAll(this, 'render');

      this.render();
      this.tweet = new TweetView();
    },

    render: function( event ){
      this.$el.append('<p>Entrez un ID de tweet :</p>'
                    + '<input type="text" name="id" id="id" />'
                    + '<button>Go!</button>'
                    + '<div id="tweet"></div>');
      return this;
    },

    events: {
      'click button': 'makeRequest'
    },

    makeRequest: function( event ) {
      var that = this;
      var query = this.getId($('input').val());
      $.ajax({
        type: "GET",
        url: "http://api.twitter.com/1/statuses/show/" + query + '.json',
        dataType: 'jsonp',
        success: function(data) {
          that.tweet.setModel({'results': data});
        }
      });
    },

    getId: function (str) {
       var array = str.split('/');
      return array[array.length - 1];
    }

  });

});