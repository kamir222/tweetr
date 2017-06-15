"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    //-------------
    //INSTRUCTIONS:
    //-------------
    //Modify saveTweet to use Mongo
    //(try Mongo's insertOne())
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },


    // Get all tweets in `db`, sorted by newest first
    //-------------
    //INSTRUCTIONS:
    //-------------
    //Modify getTweets to use Mongo
    //(try Mongo's find() function)
    // and you don't have to simulate the async delay anymore.
    //since you're doing real async with Mongo
    getTweets: function(callback) {

      console.log(db.collection("tweets"));

      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }
  }
}
