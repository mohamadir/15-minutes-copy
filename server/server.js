var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('40.83.122.67/personlist', ['personlist']);
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 1337);

app.use(bodyParser.json());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

// home page
app.get('/', function(req, res){
	res.send("Ionic App Api.");
});

app.get('/personlist', function(req, res){
	db.personlist.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/personlist', function(req, res){
	console.log("Post Requests.");
	db.personlist.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

// Delete requset
app.delete('/personlist/:id', function(req, res){
	console.log("Delete Requests: ", req.params.id);
	db.personlist.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, docs){
		console.log("Deleted Successfully!!");
		res.json(docs);
	});
});

app.listen(app.get('port'), function(){
	console.log("localhost:" + app.get('port'));
});