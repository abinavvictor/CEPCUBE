/**
 * Created by abinav.victor on 3/16/18.
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/seed-project";


/**Connects to the MongoDB Database with the provided URL**/
exports.connect = function(callback){
    MongoClient.connect(url, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err);
        }
        db = _db;
        callback(db);
    }); };