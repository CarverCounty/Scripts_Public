NWF$(document).ready(function () {	
	/* Fill all 'placeholder' attributes with each control's Help Text value */
	NWF$('.placeholders').each(function(){NWF$('#' + this.id).attr('placeholder', NWF$('#' + this.id).attr('title'));});
	
	/* Fill middle initial and SSN placeholder attributes with custom non-Help Text value */
	NWF$('.middleinitial').attr('placeholder', 'MI');  
	NWF$('.ssn').attr('placeholder', 'xxx-xx-xxxx');
	
	/* Set all Date Picker controls to have a 100 year range into the past */
	NWF$('.nf-date-picker').datepicker('option',{yearRange: '-100:+0',});
	
	/* Clear Purchase Price when Manufactured Home set to No */
	NWF$('#' + ManufacturedHome).change(function(){ClearFields('purchaseprice');});
	
	/* Copy Occupant 1's Address to Occupant 2, or clear it from Occupant 2 */
	NWF$('#' + cpyOcc1Address).change(function(){
		if(NWF$('#' + cpyOcc1Address).prop('checked')) {SetOcc2Address();} 
		else {ClearFields('occ2Address','occ2State','occ2County');}	
	});
	
	/* Copy Occupant 1's Address to Occupant 2 on Change when Same Address Checked */
	NWF$('.occ1address').blur(function(){if(NWF$('#' + cpyOcc1Address).prop('checked')){SetOcc2Address();}});
	
	/* Clear all Occupant 2 fields when number of occupants set to 1 */
	NWF$('#' + ddOccupants).change(function(){
		if(NWF$('#' + ddOccupants).val()=='1'){
			ClearFields('occ2','occ2State','occ2DD','occ2Chk');
			NWF$('#' + occ2Date).val('');
		}
	});

	/* Copy Co-Owner 1's Address to Co-Owner 2, or clear it from Co-Owner 2 */
	NWF$('#' + cpyCoOwner1Address).change(function(){
		if(NWF$('#' + cpyCoOwner1Address).prop('checked')){SetCo2Address()} 
		else {ClearFields('co2Address','co2State');}
	});

	/* Copy Co-Owner 1's Address to Co-Owner 2 on Change when Same Address Checked */
	NWF$('.co1address').blur(function(){if(NWF$('#' + cpyCoOwner1Address).prop('checked')){SetCo2Address();}});
	
	/* Clear all Relative Co-Owner & Lender fields when Relative Co-Owner set to No */
	NWF$('#' + ddRelCoOwner).change(function(){if(NWF$('#' + ddRelCoOwner).val()=='No'){ClearFields('coowner','coownerState',null,'coownerChk');}});
	
	/* Clear Relative Co-Owner 1 & 2, Lender, and Occupant 1 & 2's Agree fields on I Agree Unchecked */
	NWF$('#'+LenderAgree+', #'+RelOneAgree+', #'+RelTwoAgree+', #'+OccOneAgree+', #'+OccTwoAgree).change(function(){
		if(NWF$(this).prop('checked')==false){
			var classname;
			switch(this.id){
				case RelOneAgree:
					classname = 'reloneagree';
					break;
				case RelTwoAgree:
					classname = 'reltwoagree';
					break;
				case LenderAgree:
					classname = 'lenderagree';
					break;
				case OccOneAgree:
					classname = 'occoneagree';
					break;
				case OccTwoAgree:
					classname = 'occtwoagree';
			}			
			ClearFields(classname);
		}
	});
	
	/* Clear all Class 1b fields when Class 1b set to No */
	NWF$('#' + ddClass1b).change(function(){
		if(NWF$('#' + ddClass1b).val()=='No'){
			ClearAllAttachments();
			ClearFields('class1b',null,'class1bDD',null,'class1bBool');
			NWF$('.legallyBlind').find(':checkbox').prop('checked',false);
		}
	});
});

/* Function that sets Occupant 2's Address */
function SetOcc2Address(){
	NWF$('#' + TwoStreetAddress).val(NWF$('#' + OneStreetAddress).val());	
	NWF$('#' + TwoCity).val(NWF$('#' + OneCity).val());	
	NWF$('#' + TwoState).val(NWF$('#' + OneState).val());	
	NWF$('#' + TwoZipCode).val(NWF$('#' + OneZipCode).val()); 
	NWF$('#' + TwoCounty).val(NWF$('#' + OneCounty).val());
}

/* Function that sets Co-Owner 2's Address */
function SetCo2Address(){
	NWF$('#' + CoTwoAddress).val(NWF$('#' + CoOneAddress).val());
	NWF$('#' + CoTwoCity).val(NWF$('#' + CoOneCity).val());
	NWF$('#' + CoTwoState).val(NWF$('#' + CoOneState).val());
	NWF$('#' + CoTwoZipCode).val(NWF$('#' + CoOneZipCode).val());
}

/* Function that removes all attachments from form */
function ClearAllAttachments(){	
	NWF$('td.ms-propertysheet a').each(function(){	
		var str = NWF$(this).attr('href');	
		var parms = str.substring(50,str.length - 1).replace(/"/g,'').split(','); 
		NWF.FormFiller.Attachments.RemoveLocal(parms[0],parms[1],parms[2]);	
	});
}

/* Function that accepts class names for text, state, dropdown, and checkbox fields */
function ClearFields(txtClass, stateClass, ddClass, chkClass, boolClass){
	if(txtClass){NWF$('.' + txtClass).val('');}
	if(stateClass){NWF$('.' + stateClass).val('MN');}
	if(ddClass){NWF$('.' + ddClass).val('**SelectValue**');}
	if(chkClass){NWF$('.' + chkClass + '>input').prop('checked',false);}
	if(boolClass){NWF$('.' + boolClass).val('No');}
}

/* Function used in a validation rule on the form to confirm at least one attachment exists */
function GetNumberOfAttachments(attCtrlClassName){
	return NWF.FormFiller.Attachments.GetAttachedFilesCount(
		NWF.FormFiller.Functions.GetFillerDivObjectForControl(
			NWF$('#'+NWF$('.' + attCtrlClassName + ' .nf-attachmentsRow')[0].id)).data('controlid')
	)
}
