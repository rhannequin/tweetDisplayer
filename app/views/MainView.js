define(["use!backbone", "text!app/views/template.html"], function(Backbone, tmpl) {

  return Backbone.View.extend({

    el: 'body',

    initialize: function() {
      _.bindAll(this, 'render');
      this.tmpl = _.template(tmpl);

      this.render();
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
          var text = that.parseTweet(data.text);
          $('#tweet').html(that.tmpl({
            userName: data.user.name,
            text: text
          }));
        }
      });
    },

    getId: function (str) {
       var array = str.split('/');
      return array[array.length - 1];
    },

    parseUsername: function(str) {
      return str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        return '<a href="http://twitter.com/' + u.replace("@","") + '">' + u + '</a>';
      });
    },

    parseUrl: function(str) {
      return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      });
    },

    parseHashtag: function(str) {
      return str.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        return '<a href="http://search.twitter.com/search?q=' + t + '">' + t + '</a>';
      });
    },

    parseTweet: function(str) {
      var str = this.parseUrl(str);
      str = this.parseUsername(str);
      str = this.parseHashtag(str);
      return str;
    }

  });

});