"use strict"; // makes sure that variables are declared

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser"); //middlewear takes data and converts it to javascript Object, so it's easier to work with
const app           = express(); //for easier user
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


app.use(bodyParser.urlencoded({ extended: true })); //using the qs library in the body parser
app.use(express.static("public")); // looks up things in the public file

// The in-memory database of tweets. It's a basic object with an array in it.
//const db = require("./lib/in-memory-db");
// modify in-memory db
// Instead, connect to Mongo,
// once it's connected,
// pass the Mongo db into the
// server/lib/data-helpers.js factory function instead.


// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
