"use strict";
let mongoose = require(`mongoose`);



mongoose.connect(`mongodb://localhost/topten`,()=>{	
	mongoose.connection.db.dropDatabase();
	require('./seed.js');
	console.info(`Initialized database.`);			 
});
