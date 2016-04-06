$(document).ready(function(){

	// popover tooltips
    $('[data-toggle="popover"]').popover({
    	container: 'body'
	});

	// disable popover href="#"
	$('[data-toggle="popover"]').on('click', function(e) {e.preventDefault(); return true;});

	// copy buttons
	(function(){
    	new Clipboard('.copy');
	})();

	// bind settings on change
	$('#settings input').bind('input', function(){
  		property_investment_calculator.calculate();
	});

	// bind checkbox on change
	$('input[type="checkbox"]').change(function(){
		property_investment_calculator.calculate();
	});

	// bind valuation basis toggle
	var on_change_valuation_basis = function(e) {
		var basis = $('#mortgage_valuation_basis').prop("checked") ? 'commercial' : 'bricks_and_mortar';
		if(basis == 'commercial'){
			$('#commercial_multiplier__container').show();
			$('#commercial_valuation__container').show();
			$('#post_conversion_valuation__container').hide();
		}
		else{
			$('#commercial_multiplier__container').hide();
			$('#commercial_valuation__container').hide();
			$('#post_conversion_valuation__container').show();
		}
	};
	$('#mortgage_valuation_basis').change(on_change_valuation_basis);
	on_change_valuation_basis();

	// initialize data persister and calculator
	var property_investment_persister = new PropertyInvestmentPersister();
	var property_investment_calculator = new PropertyInvestmentCalculator();

	// bind save modal button
	$('#save_button').on('click', function(e){
		e.preventDefault();
		
		// save data
		var data = $('form').serialize();
		var property_name = $('#property_name').val();
		property_investment_persister.saveNew(property_name, data);
		
		// show success message
		var url = property_investment_persister.build_url(data);
		$('#save_url').val(url);
		$('#save_message').removeClass('hidden');
	});

	// set toastr options
	toastr.options = property_investment_calculator.toastr_options;
	
	// deserialize data from url or defaults
	var data = location.search.substr(1);
	if(data.length == 0 && getParameterByName('defaults') != 'false')
		data = property_investment_calculator.defaults;
	$('form').deserialize(data);

	// init property investment calculator and call calculate
	property_investment_calculator.calculate();

});
