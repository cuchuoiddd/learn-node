import mongoose from 'mongoose';

module.exports = function(){
	var dbName = "admin";

	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/' + dbName);
	mongoose.connection
			.once('open', ()  => console.log("* Mongo connected: " + dbName))
			.on('error' , err => console.error("* Can't connect mongodb"));
}
