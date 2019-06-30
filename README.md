# liri-node-app
## Homework 8 Liri Bot
In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Walk through

Note: This app is running npm version 6.9.2.

To get the app to work please download the following npm commands:

```js
npm -v
npm init -y
npm i dotenv
npm i moment
npm i liri-node-app
```

You will also need to create the following file

```
# .env contents format
# Spotify API keys

SPOTIFY_ID=
SPOTIFY_SECRET=

OMDBI_KEY=

BANDS_KEY=
```

1. This can be done by going to the Spotify website and creating an account.
2. This can be done by going to the OMDBI website and setting up an account.
3. This can be done by going to the Bandsintown api and setting up an account.

You will also need to run command.
```js
node liri.js
```

### GIFs




### Screenshots


### Bug fix

During the log.txt stage after running the terminal commands I noticed when viewing preview my Spotify api was show so I removed it using:
```js
.split("=")[0]
```
to preview your spotify songs paste the url after the preview and add 
```
=SPOTIFY_ID
```
