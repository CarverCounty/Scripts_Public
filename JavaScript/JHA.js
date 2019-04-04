NWF$(document).ready(function () {
	/* For each hazards1-4 object on change, run UpdateCheckbox function passing object and respective chkbox1-4 object */
	NWF$('#' + hazards1).change(function(){UpdateCheckbox(NWF$('#' + hazards1),NWF$('#' + chkbox1));});
	NWF$('#' + hazards2).change(function(){UpdateCheckbox(NWF$('#' + hazards2),NWF$('#' + chkbox2));});
	NWF$('#' + hazards3).change(function(){UpdateCheckbox(NWF$('#' + hazards3),NWF$('#' + chkbox3));});
	NWF$('#' + hazards4).change(function(){UpdateCheckbox(NWF$('#' + hazards4),NWF$('#' + chkbox4));});
});

function UpdateCheckbox(checkboxes,checkbox){
	/* For current object, return length/count of all input fields (checkboxes) */
	var totalCount = checkboxes.find("input").length;

	/* Identical to totalCount, except only returning selected/checked checkboxes */
	var checkedCount = checkboxes.find("input:checked").length;

	/* If not all checkboxes in current object selected, uncheck respective chkbox1-4 object */
	if (checkedCount != totalCount) {
		checkbox.prop('checked', false);
		NWF.FormFiller.Functions.ProcessOnChange(checkbox);

	/* Else if all checkboxes in current object selected, check respective chkbox1-4 object */
	} else {
		checkbox.prop('checked', true);
		NWF.FormFiller.Functions.ProcessOnChange(checkbox);
	}
}
