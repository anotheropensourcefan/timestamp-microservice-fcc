// index.js
// where your node app starts

// init project
const express = require('express');
var app = express();

// I used Luxon in my first version
// I ended up using only JS as it is a small project with small requirements
const { DateTime } = require('luxon')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (request, response) => {
  // get the date from the request params in the URL
  const date = request.params.date

  let newDate

  // tests : doesn't exist ; is a timestamp ; is a string
  if (!date) {
    newDate = new Date()
  } else {
    // for some reasons, I had to tell JS that unix starts on 1970
    date.match(/^\d+$/) ? newDate = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, date)) : newDate = new Date(date)
  }
  if (newDate == "Invalid Date") {
    response.json({ error: "Invalid Date" })
  } else {
    response.json({
      "unix": newDate.valueOf(),
      "utc": newDate.toUTCString()
    })
  }

})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
