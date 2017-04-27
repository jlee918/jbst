var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://admin:bst@ds139949.mlab.com:39949/bst');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JBST' });
});

/* GET Create Post page. */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Are you selling or looking for?' });
});

/* GET View All page. */
router.get('/all', function(req, res, next) {
    //res.render('all', { title: 'All Listings' });
    var db = req.db;
    var collection = db.get('shoecollection');
    collection.find({},{},function(e,docs){
        res.render('all', {
            "shoelist" : docs,
            title: 'All Listings'
        });
    });
});


/* GET Buy page. */
// router.get('/buy', function(req, res) {
//     var db = req.db;
//     var collection = db.get('shoecollection');
//     collection.find({},{},function(e,docs){
//         res.render('buy', {
//             "shoelist" : docs
//         });
//     });
// });

/* GET Sell page. */
router.get('/sell', function(req, res) {
    res.render('sell', { title: 'What are you selling?' });
});

/* POST to ShoeCollection */
router.post('/additem', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var shoename = req.body.shoename;
    var shoesize = req.body.shoesize;
    var shoebrand = req.body.shoebrand;
    var shoecondition = req.body.shoecondition;
    var shoeprice = req.body.shoeprice;
    var notes = req.body.notes;
    var shoeimages = req.body.shoeimages;

    // Set our collection
    var collection = db.get('shoecollection');

    // Submit to the DB
    collection.insert({
        "shoename" : shoename,
        "shoesize" : shoesize,
        "shoebrand" : shoebrand,
        "shoecondition" : shoecondition,
        "shoeprice" : shoeprice,
        "notes" : notes,
        "shoeimages" : shoeimages,
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

/* GET Wants page. */
router.get('/wants', function(req, res) {
    var db = req.db;
    var collection = db.get('lfcollection');
    collection.find({},{},function(e,docs){
        res.render('wants', {
            "wantlist" : docs,
            title: 'All Shoes Wanted'
        });
    });
});


/* GET Looking for page. */
router.get('/lookingfor', function(req, res) {
    res.render('lookingfor', { title: 'What are you looking for?' });
});

/* POST to LfCollection */
router.post('/addlfitem', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var shoename = req.body.shoename;
    var shoesize = req.body.shoesize;
    var shoebrand = req.body.shoebrand;
    var shoecondition = req.body.shoecondition;
    var minimum = req.body.minimum;
    var maximum = req.body.maximum;
    var notes = req.body.notes;

    // Set our collection
    var collection = db.get('lfcollection');

    // Submit to the DB
    collection.insert({
        "shoename" : shoename,
        "shoesize" : shoesize,
        "shoebrand" : shoebrand,
        "shoecondition" : shoecondition,
        "minimum" : minimum,
        "maximum" : maximum,
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


/* GET Search Page */
router.get('/search', function (req, res) {
    res.render('search');
});
router.post('/search', function (req, res) {
    viewer.searchMatchingComics(req, res);
});

module.exports = router;
