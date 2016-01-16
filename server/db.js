"use strict";
let mongoose = require(`mongoose`);

mongoose.connect(process.env.NODE_ENV == 'production' ? `mongodb://heroku_drx2dp31:35a0gtdvl0gmqhvkejrrjion9s@ds047305.mongolab.com:47305/heroku_drx2dp31` : `mongodb://localhost/topten`,()=>{	
	mongoose.connection.db.dropDatabase(function(){
		require('./seed.js');	
	});
});
