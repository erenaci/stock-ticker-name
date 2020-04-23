const http = require('http');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const url = "mongodb+srv://erenaci:ljmSt65s48IulZUf@cluster0-bny5d.mongodb.net/test?w=majority";
const dbName = 'Companies';

const port = process.env.PORT || 3000;


// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//    fs.readFile('./index.html', null, function (err, data) {
//         if (err) {
//             res.writeHead(404);
//             res.write('Whoops! File not found!');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// }).listen(port);



app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});


app.listen(port, function () {
	console.log(`Server running at http://localhost:${port}/`);
})


function displayData(client) {
	var dbo = client.db(dbName);
	var collection = dbo.collection('companies');

	app.get('/result.html', function (req, res) {
		if (req.query['company'] == null) {
			var toFind = { Ticker: `${req.query['ticker']}` };
			var query = collection.findOne(toFind, function(err, item) {
			res.send('This stock ticker is of ' + item.Company);  //IT WORKED
			});
		}
		else if (req.query['ticker'] == null) {
			var toFind = { Company: `${req.query['company']}` };
			var query = collection.findOne(toFind, function(err, item) {
			res.send("This company's stock ticker is  " + item.Ticker);  //IT WORKED
			});
		}
	});
}


var client = MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
client.then(client => displayData(client))
client.catch(err => console.log("Error ocurred connecting to MongoDB."));

