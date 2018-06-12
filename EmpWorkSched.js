NWF$(document).ready(function () {
	var chk = NWF$('#' + Unsign); 
	var accept = NWF$('#' + OriginatorAccept);
	chk.change(function(){ 
		if(chk.prop('checked') && accept.prop('checked')) { 
			accept.prop('disabled',false);
			var strMyRadioButtonValue = NWF$('#' + SupervisorApproval).find("input:checked").val(); 
			NWF$('#' + SupervisorApproval).find('input[value=\'' + strMyRadioButtonValue + '\']').attr('checked', false);
			accept.click();
			chk.prop('checked',false);
		}
	});
	accept.change(function(){
		NWF$('#' + OriginatorSigDateTime).trigger('change');
		NWF$('#' + temp).change();
		NWF$('#' + SupervisorApproval).click();
	});
});
