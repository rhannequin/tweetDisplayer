require.config({
  baseUrl: "/workspace/github/tweetDisplayer/",
  paths: {
    "jquery": "lib/jquery.min",
    "backbone": "lib/backbone.min",
    "underscore": "lib/underscore.min",
    "i18n": "lib/require/i18n.min",
    "order": "lib/require/order.min",
    "text": "lib/require/text.min",
    "use": "lib/require/use.min"
  },

  use: {
   "underscore": {
     attach: "_"
   },
   "jquery": {
    attach: "$"
   },
  "backbone": {
     deps: ["use!underscore", "use!jquery"],
     attach: function(_, $) {
       return Backbone;
     }
   }
 }
});
require(['app/views/MainView', 'app/views/TweetView'], function(MainView, TweetView){

  var mainView = new MainView();

});