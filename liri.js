require("dotenv").config();

var Spotify = require("node-spotify-api");

var command = process.argv[2];

var value = process.argv.slice(3).join("");

var request = require("request");

var keys = require("./keys");

// console.log(command);

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

  var spotify = new Spotify(keys.spotifyKeys);

  spotify.search({ type: "track", query: value, limit: "1" }, function(
    err,
    data
  ) {
    if (err) {
      console.log("Error occured: " + err);
    } else {
      console.log("{{{**********||**********}}}");
      console.log(
        "\nArtist: " +
          JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) +
          "\n"
      );
      console.log(
        "Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n"
      );
      console.log(
        "Album " + JSON.stringify(data.tracks.items[0].album.name) + "\n"
      );
      console.log("{{{**********||**********}}}");
    }
  });
}

function doTheBandThing() {
  console.log("Doing the band thing");

  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    value +
    "/events?app_id=codingbootcamp";
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("{{{**********||**********}}}");
      // console.log(body);
      console.log(JSON.stringify(body, null, 2));
      console.log("{{{**********||**********}}}");
    }
  });
}

function theMovieThing() {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("{{{**********||**********}}}");
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("{{{**********||**********}}}");
    }
  });
}
