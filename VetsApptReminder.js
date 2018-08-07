NWF$(document).ready(function () {
	NWF$('.placeholders').each(function(){
	   NWF$('#' + this.id).attr('placeholder', NWF$('#' + this.id).attr('title'));
	});
	NWF$('#' + SendTo + ' input, #' + ApptType + ' input').change(function(){
		if(NWF$('input#' + this.id).prop('checked')){
			if(NWF$("label[for='" + this.id + "']").text()=='Street Address'){
				NWF$('.address').val('');
			}
			if(NWF$("label[for='" + this.id + "']").text()=='Email Address'){
				NWF$('.email').val('');
			}
			if(NWF$("label[for='" + this.id + "']").text()=='Other'){
					NWF$('.other').val('');
			}
		}
	});
	NWF$('#' + zip).change(function(){
		$.ajax({
			type: 'POST',
			url: 'https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML='+ 
				'<CityStateLookupRequest USERID="[USPS USER ID]">'+
				'<ZipCode ID="0"><Zip5>'+$(this).val()+'</Zip5></ZipCode></CityStateLookupRequest>',
			dataType: 'xml',
			success: function (response) {
				$('ZipCode',response).each(function(){ 
					NWF$('#' + city).val(
						$(this).find('City').text().toLowerCase().replace(/\b(\S)/g,function(t){return t.toUpperCase()}
					));
					NWF$('#' + state).val($(this).find('State').text());
				});
			},
			error: function (error){console.log(error);}
		});
	});
});
