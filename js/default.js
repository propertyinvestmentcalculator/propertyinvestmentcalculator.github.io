$(document).ready(function(){

	$('#builtByCocept').on('click', function(e){
		// send event to google analytics
		ga('send', 'event', 'Cocept', 'modal');
		console.log('event sent to ga');
		return true;
	});

	$('#contactCocept').on('click', function(e){
		// send event to google analytics
		ga('send', 'event', 'Cocept', 'contact');
		console.log('event sent to ga');
		return true;
	});

});
