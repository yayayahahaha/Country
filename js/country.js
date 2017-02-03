document.addEventListener("DOMContentLoaded", function() {

	$.ajax({
			url: '',
		})
		.done(function(res) {
			console.log(res);
		})
		.fail(function(res) {
			console.log(res);
		})
		.always(function(res) {
			console.log(res);
		});

});