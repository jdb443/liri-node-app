require("dotenv").config();
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bands = {
  id: process.env.BANDS_KEY
}

exports.omdbi = {
  id: process.env.OMDBI_KEY,
}