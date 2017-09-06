'use strict';
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

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */
fs.readFile('./listings.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } 
    var obj = JSON.parse(data);

    obj.entries.forEach(function(value){
        // create a new listing
        var entry;
        if(value.address!=undefined){
          if(value.coordinates.latitude!=undefined && value.coordinates.longitude!=undefined){
            //if it has address AND lat/long
            entry = new Listing({
              "code": value.code,
              "name": value.name,
              "coordinates": {
                "latitude": value.coordinates.latitude,
                "longitude": value.coordinates.longitude
              },
              "address": value.address
            });
          }else{
            //if it has address but not lat/long
            entry = new Listing({
              "code": value.code,
              "name": value.name,
              "address": value.address
            });
          }
        }else{
            //if it has only code & name
            entry = new Listing({
              "code": value.code,
              "name": value.name
            });
        }

        entry.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            //console.log('Done');
          }
        });
    });

   // queries.findLibraryWest;
});
/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */