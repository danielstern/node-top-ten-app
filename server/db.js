"use strict";
let mongoose = require(`mongoose`);

mongoose.connect(process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || `mongodb://localhost/topten`,()=>{	
	mongoose.connection.db.dropDatabase(function(){
		require('./seed.js');	
	});
});
