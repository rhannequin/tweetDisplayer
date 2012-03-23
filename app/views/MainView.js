define(["use!backbone"], function(Backbone) {

  return Backbone.View.extend({

    el: 'body',

    initialize: function() {
      _.bindAll(this, 'render');

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
          var content = '';
          content += '<ul>';
          content += '<li>Author : ' + data.user.name + '</li>';
          content += '<li>Tweet : ' + data.text + '</li>';
          content += '</ul>';
          $('#tweet').html(content);
        }
      });
    },

    getId: function (str) {
       var array = str.split('/');
      return array[array.length - 1];
    }

  });

});