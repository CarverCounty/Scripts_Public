NWF$(document).ready(function () {
	/* Fill all 'placeholder' attributes with each control's Help Text value */
	NWF$('.placeholders').each(function(){
		NWF$('#' + this.id).attr('placeholder', NWF$('#' + this.id).attr('title'));
	});
	
	/* Clear Address, Email, and/or Other text fields when deselected */
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

	/* Lookup City and State via USPS API from Zip Code - DO NOT SHARE [USPS USER ID]
					**USPS API can ONLY be used for mailing** 					*/
	NWF$('#' + zip).change(function(){
		$.ajax({
			type:	'POST',
			url:	'https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML='+ 
					'<CityStateLookupRequest USERID="[USPS USER ID]">'+
					'<ZipCode ID="0"><Zip5>'+$(this).val()+'</Zip5></ZipCode></CityStateLookupRequest>',
			dataType: 'xml',
			success: function (response) {
				
				/* For 'each' ZipCode returned in the XML response... */
				$('ZipCode',response).each(function(){ 
				
					/* Set the City field equal to... */
					NWF$('#' + city).val(
				
						/* Find the City text value in the returned XML, set it to all lowercase, replace the first 
							letter of each word using regex to uppercase, and return the result */
						$(this).find('City').text().toLowerCase().replace(/\b(\S)/g,function(t){return t.toUpperCase()}
					));
					
					/* Set the State field equal to the State text value from the returned XML */
					NWF$('#' + state).val($(this).find('State').text());
				});
			},
			error: function (error){console.log(error);}
		});
	});
	
	/* Remove duplicate Service Document entries */
	NWF$('.services').change(function(){

		/* Pause for 1/10 second so form has time to populate list values */
		setTimeout(removeDups,100);
	});
});

/* Function to remove duplicate checkbox entries */
function removeDups(){
	var items = [];
	NWF$('.servicedocuments span').each(function(){
		var txt=NWF$(this).find("label").text();
		if(items.includes(txt)){NWF$(this).remove();}
		else{items.push(txt);}
	});
}
