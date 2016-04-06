function rebuildSavedPropertiesList(property_investment_persister){
	// show saved properties
	var data = property_investment_persister.load();
	$('#calculatorMenu .savedProperty').remove();
	if(jQuery.isEmptyObject(data) === false){
		var prototype = $('#calculatorMenu').data('prototype');
		$.each(data, function(property_name, serialized_data){
			var element = prototype.split('__property_name__').join(property_name)
								   .split('__serialized_data__').join(serialized_data);
			element = $(element);
			$('#calculatorMenu').append(element);
		});
	}
}

var property_investment_persister = null;

$(document).ready(function(){

	// bind delete buttons
	$('#calculatorMenu').on('click', 'a.deleteProperty', function(e){
		if(confirm("Are you sure you want to delete this property?")){
			property_investment_persister.remove($(this).data('name'))
			rebuildSavedPropertiesList(property_investment_persister);
		}
	});

	property_investment_persister = new PropertyInvestmentPersister();
	rebuildSavedPropertiesList(property_investment_persister);

});
