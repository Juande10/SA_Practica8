const {Router} = require('express');
const router = Router();

/*
const mongoose = require('mongoose')
mongoose.connect('mongodb://mongodb/mydb',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(db => console.log('DB is connected to', db.connection.host))
        .catch(err => console.error(err));

// get reference to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function() {
    console.log("MongoDB database connection established successfully");
});
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongodb/mydb";

router.get('/', (req, res)=>{
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        ///dbo.collection("customers").deleteMany();
        dbo.collection("customers").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
        });
    });
    
});

router.get('/:name', (req, res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: req.params.name};
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          db.close();
          
        });
    });
    res.send("Insertado!");
});

module.exports = router;