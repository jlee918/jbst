var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://admin:bst@ds139949.mlab.com:39949/bst');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JBST' });
});

/* GET Buy page. */
router.get('/buy', function(req, res) {
    var db = req.db;
    var collection = db.get('shoecollection');
    collection.find({},{},function(e,docs){
        res.render('buy', {
            "shoelist" : docs
        });
    });
});

/* GET Sell page. */
router.get('/sell', function(req, res) {
    res.render('sell', { title: 'What are you selling?' });
});

/* POST to Add User Service */
router.post('/additem', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var shoename = req.body.shoename;
    var shoesize = req.body.shoesize;
    var shoebrand = req.body.shoebrand;
    var shoecondition = req.body.shoecondition;
    var notes = req.body.notes;

    // Set our collection
    var collection = db.get('shoecollection');

    // Submit to the DB
    collection.insert({
        "shoename" : shoename,
        "shoesize" : shoesize,
        "shoebrand" : shoebrand,
        "shoecondition" : shoecondition,
        "notes" : notes,
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect('/');

        }
    });
});

module.exports = router;
