const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const csv = require('csv-parser');
const fs = require('fs');

const url = "mongodb+srv://erenaci:ljmSt65s48IulZUf@cluster0-bny5d.mongodb.net/test?w=majority";

const dbName = 'Companies';


function insertData(client) {
	var dbo = client.db(dbName);
	var collection = dbo.collection('companies');

	fs.createReadStream('companies.csv')
	.pipe(csv())
	.on('data', function (data) {
	collection.insertOne(data, function(err, res) {
			if (err) throw err;

			console.log("data inserted");
		})
	})
	// .on('end', function () {
	// 	client.close();
	// });
}

var client = MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
client.then(client => insertData(client))
client.catch(err => console.log(err));

















