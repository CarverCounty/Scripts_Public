/* Not sure if this is still used 8/27/18 */

NWF$(document).ready(function () {
	/* Variable to hold the Unsign checkbox control */
	var chk = NWF$('#' + Unsign); 

	/* Variable to hold the OriginatorAccept checkbox control */
	var accept = NWF$('#' + OriginatorAccept);

	/* On Unsign checkbox change... */
	chk.change(function(){ 
	
		/* If Unsign and OriginatorAccept are both checked... */
		if(chk.prop('checked') && accept.prop('checked')) { 
			
			/* Enable OriginatorAccept checkbox */
			accept.prop('disabled',false);
			
			/* Can these two lines be combined?? */
			var strMyRadioButtonValue = NWF$('#' + SupervisorApproval).find("input:checked").val(); 
			NWF$('#' + SupervisorApproval).find('input[value=\'' + strMyRadioButtonValue + '\']').attr('checked', false);

			/* Click OriginatorAccept checkbox - Triggers change */
			accept.click();

			/* Uncheck Unsign checkbox - Does not trigger change */
			chk.prop('checked',false);
		}
	});

	/* TESTING???? */
	/* On OriginatorAccept checkbox change... */
	accept.change(function(){
		NWF$('#' + OriginatorSigDateTime).trigger('change');
		NWF$('#' + temp).change();
		NWF$('#' + SupervisorApproval).click();
	});
});
