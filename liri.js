require("dotenv").config();

var spotify = new Spotify(keys.spotify);

var Spotify = require("node-spotify-api");

var command = process.argv[2];

var request = require("request");

console.log(command);

var possibleCommands = {
  spotifyThisSong: doTheSpotify,
  concertThis: doTheBandThing,
  movieThis: theMovieThing,
  doSomething: function(possibleCommands) {
    if (this[command]) {
      this[command]();
    } else {
      console.log("I can't do that Hal");
    }
  }
};

possibleCommands.doSomething([command]);

function doTheSpotify() {
  console.log("I will spotify");

  spotify.search({ type: "track", query: "All the Small Things" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(data);
  });
}

function doTheBandThing() {
  console.log("Doing the band thing");
}

function theMovieThing() {
  // Grab the movieName which will always be the third node argument.
  var movieName = process.argv[3];

  // Then run a request to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Country: " + JSON.parse(body).Country);
    }
  });
}
