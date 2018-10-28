// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var timestamp = require('unix-timestamp');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello APIdd'});
});

app.get("/api/timestamp/:date_string?", function(req,res) {
	var test="";
	var unixVal = "";
	var utcVal = "";
	var dateFormat = "";
	if (req.params.date_string == null)
	{
		dateFormat = new Date();
		utcVal = dateFormat.toUTCString();
		unixVal = dateFormat.getTime();	
	}
	else 
	{
		if (req.params.date_string === parseInt(req.params.date_string, 10).toString()){
			dateFormat=new Date(parseInt(req.params.date_string,10));
		}
		else
		{
			dateFormat = new Date(req.params.date_string);
		}
		utcVal = dateFormat.toUTCString();
		unixVal = dateFormat.getTime();
	}
	
	res.json({"unix":unixVal,"utc":utcVal});

});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});