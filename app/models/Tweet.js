define(["use!backbone"], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {

    },

    fromApi: function (data) {
      return {
        tweetId : data.id,
        date: data.created_at,
        name: data.user.name,
        username: data.user.screen_name,
        parsedUsername: this.linkUser(data.user.screen_name),
        userId: data.user.id,
        userFollowers: data.user.followers_count,
        userFollowing: data.user.friends_count,
        originalText: data.text,
        parsedText: this.parseTweet(data.text),
        retweeted: data.retweeted,
        retweetCount: data.retweet_count
      };
    },

    parseUrl: function(str) {
      return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      });
    },

    parseUsername: function(str) {
      var that = this;
      return str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        return that.linkUser(u.replace("@",""));
      });
    },

    linkUser: function(username) {
      return '<a href="http://twitter.com/' + username + '">@' + username + '</a>';
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