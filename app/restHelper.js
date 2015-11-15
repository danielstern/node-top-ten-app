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
				success,
				error
			});
		});
	},
	del(url){
		return new Promise(function(success,error){
			$.ajax({
				url:url,
				type:'DELETE',
				success,
				error
			})
		})
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
	},
	patch(url,data){
		return new Promise(function(success,error){
			$.ajax({
				url,
				type:'PATCH',
				data,
				success,
				error
			})
		})
	}
}
