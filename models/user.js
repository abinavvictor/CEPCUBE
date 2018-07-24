var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseuniqueValidator = require('mongoose-unique-validator')

var schema = new Schema({
    firstName :{ type:String, required :true},
    lastName :{type:String, required :true},
    password : {type:String, required:true},
    email :{type:String, required :true, unique : true},
    messages: [{ type : Schema.ObjectId, ref : 'Message'}]
});

module.exports = mongoose.model('User',schema);
schema.plugin(mongooseuniqueValidator);
