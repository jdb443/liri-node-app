var fs = require("fs");
var keys = require("./keys.js");
var moment = require('moment');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var parameter = process.argv[3];

function switchCase() {

    switch (action) {

        case 'concert-this':
        bandsInTown(parameter);                   
        break;                          

        case 'spotify-this-song':
        spotSong(parameter);
        break;

        case 'movie-this':
        movieInfo(parameter);
        break;

        case 'do-what-it-says':
        getRandom();
        break;

        default:                            
        logIt("Invalid Instruction");
        break;
    }
};

function bandsInTown(parameter){

if (action === 'concert-this')
{
	var bandName = "";
	for (var i = 3; i < process.argv.length; i++)
	{
		bandName += process.argv[i];
	}
    console.log(bandName)
}
else
{
	bandName = parameter;
}


var queryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=${keys.bands.id}`;
// var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + keys.bands.id;

request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {

        var JS = JSON.parse(body);
        // console.log(JS);
        for (i = 0; i < JS.length; i++)
        {
        var daTime = JS[i].datetime;
            var dateForm = moment(daTime).format('MM/DD/YYYY');
            var string2 = ""
            var string1 =
            "\n---------------------------------------------\n" +
            "Name: " +
            JS[i].venue.name +
            "\n" +
            "City: " + 
            JS[i].venue.city +
            "\n";
            if (JS[i].venue.region !== "")
            {
                string2 = "Country: " + 
                JS[i].venue.region
            }
            var string3 = "\n" +
            "Country: " + 
            JS[i].venue.country +
            "\n" +
            "Date: " + 
            dateForm +
            "\n" +
            "\n---------------------------------------------\n";
            logIt(string1+string2+string3);

            // Code
            // logIt("\n---------------------------------------------\n");            
            // logIt("Name: " + JS[i].venue.name);
            // logIt("City: " + JS[i].venue.city);
            // if (JS[i].venue.region !== "")
            // {
            //     logIt("Country: " + JS[i].venue.region);
            // }
            // logIt("Country: " + JS[i].venue.country);
            // logIt("Date: " + dateForm);
            // logIt("\n---------------------------------------------\n");

        }
    }
});
}

function spotSong(parameter) {


    var searchTrack;
    if (parameter === undefined) {
        searchTrack = "I Want it That Way";
    } else {
        searchTrack = parameter;
    }

    spotify.search({
        type: 'track',
        query: searchTrack
    }, function(error, data) {
        if (error) {
        logIt('Error occurred: ' + error);
        return;
        } else {
            var stringBuilders =
            "\n---------------------------------------------\n" +
            "Artist: " +
            data.tracks.items[0].artists[0].name +
            "\n" +
            "Song: " +
            data.tracks.items[0].name +
            "\n" +
            "Preview: " + 
            data.tracks.items[3].preview_url.split("=")[0] +
            "\n" +
            "Album: " + 
            data.tracks.items[0].album.name +
            "\n" +
            "Release Date: " + 
            moment(data.tracks.items[0].album.release_date).format('MM/DD/YYYY') +
            "\n" +
            "\n---------------------------------------------\n";
            logIt(stringBuilders);
        // logIt("\n---------------------------------------------\n");
        // logIt("Artist: " + data.tracks.items[0].artists[0].name);
        // logIt("Song: " + data.tracks.items[0].name);
        // logIt("Preview: " + data.tracks.items[3].preview_url.split("=")[0]); // It prints the secret spotify key if its not split
        // logIt("Album: " + data.tracks.items[0].album.name);
        // logIt("Release Date: " + moment(data.tracks.items[0].album.release_date).format('MM/DD/YYYY'));        
        // logIt("\n---------------------------------------------\n");
        
        }
    });
};
function movieInfo(parameter) {


    var findMovie;
    if (parameter === undefined) {
        findMovie = "Mr. Nobody";
    } else {
        findMovie = parameter;
    };

    var queryUrl = `http://www.omdbapi.com/?t=${findMovie}&y=&plot=short&apikey=${keys.omdbi.id}`;
    // var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=" + keys.omdbi.id;
    
    request(queryUrl, function(err, res, body) {
        var bodyOf = JSON.parse(body);
        if (!err && res.statusCode === 200) {
            var stringBuilder =
            "\n---------------------------------------------\n" +
            "Title: " +
            bodyOf.Title +
            "\n" +
            "Release Year: " +
            bodyOf.Year +
            "\n" +
            "IMDB Rating: " +
            bodyOf.imdbRating +
            "\n" +
            "Rotten Tomatoes Rating: " +
            bodyOf.Ratings[1].Value +
            "\n" +
            "Country: " +
            bodyOf.Country +
            "\n" +
            "Language: " +
            bodyOf.Language +
            "\n" +
            "Plot: " +
            bodyOf.Plot +
            "\n" +
            "Actors: " +
            bodyOf.Actors +
            "\n" +
            "\n---------------------------------------------\n";
            logIt(stringBuilder);
        // logIt("\n---------------------------------------------\n");
        // logIt("Title: " + bodyOf.Title);
        // logIt("Release Year: " + bodyOf.Year);
        // logIt("IMDB Rating: " + bodyOf.imdbRating);
        // logIt("Rotten Tomatoes Rating: " + bodyOf.Ratings[1].Value); 
        // logIt("Country: " + bodyOf.Country);
        // logIt("Language: " + bodyOf.Language);
        // logIt("Plot: " + bodyOf.Plot);
        // logIt("Actors: " + bodyOf.Actors);
        // logIt("\n---------------------------------------------\n");
        }
    });
};

function getRandom() {
fs.readFile('random.txt', "utf8", function(error, data){

    if (error) {
        return logIt(error);
        }
  
    var dataArr = data.split(",");
    
    if (dataArr[0] === "spotify-this-song") 
    {
        var songcheck = dataArr[1].trim().slice(1, -1);
        spotSong(songcheck);
    } 
    else if (dataArr[0] === "concert-this") 
    { 
        if (dataArr[1].charAt(1) === "'")
        {
            var dLength = dataArr[1].length - 1;
            var data = dataArr[1].substring(2,dLength);
            console.log(data);
            bandsInTown(data);
        }
        else
        {
            var bandName = dataArr[1].trim();
            console.log(bandName);
            bandsInTown(bandName);
        }
  	  
    } 
    else if(dataArr[0] === "movie-this") 
    {
        var movie_name = dataArr[1].trim().slice(1, -1);
        movieInfo(movie_name);
    } 
    
    });

};

function logIt(dataToLog) {

	console.log(dataToLog);

	fs.appendFile('log.txt', dataToLog, function(error) {

        if (error) return logIt('Error logging data to file: ' + error);
        	
	});
}

switchCase();