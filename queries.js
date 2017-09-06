/* Fill out these functions using Mongoose queries*/
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
var db = mongoose.connect(config.db.uri, { useMongoClient: true, /* other options */ });

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.find({ 'code': 'LBW' }, function(err, entry) {
    if (err){
      console.log(error);
    }

    // print Lib West Record
    console.log(">>>>>>>>>>>>findLibraryWest\n"+entry);
  });

};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   //console.log(">>>>>>>>>>>>try removeCable\n");
   Listing.find({ code: 'CABL'}, function(err, document){
      if(err){
        console.log(err);
      }else{
        console.log(">>>>>>>>>>>>removeCable\n"+document);
      }
   }).remove();
};

var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   //Phelps Lab, Gainesville, FL 32603
  Listing.findOneAndUpdate({code: 'PHL'},{address: 'Phelps Lab, Gainesville, FL 32603'}, {upsert:true}, function(err, entry){
    if (err){
      console.log(error);
    }

    // print Lib West Record
    console.log(">>>>>>>>>>>>updatePhelpsLab\n"+entry);
  });

};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   Listing.find({}, function(err, entries) {
      if (err){
        console.log(error);
      }

      // print Lib West Record
      console.log(">>>>>>>>>>>>retrieveAllListings\n"+entries);
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
