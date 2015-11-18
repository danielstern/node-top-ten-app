let $ = require('jquery');

module.exports = {
	get(url){
		return new Promise(function(success,error){
			$.ajax({
				url:url,
				xhrFields: {
				   withCredentials: true
				},
				dataType:"json",
				type:'GET',
				success,
				error
			});
		});
	},
	post(url,data){
		return new Promise(function(success,error){
			$.ajax({
				url,
				xhrFields: {
				   withCredentials: true
				},
				type:'POST',
				data,
				success,
				error
			})
		})
	}
}
