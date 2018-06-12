NWF$(document).ready(function () {
	NWF$('#' + hazards1).change(function(){UpdateCheckbox(NWF$('#' + hazards1),NWF$('#' + chkbox1));});
	NWF$('#' + hazards2).change(function(){UpdateCheckbox(NWF$('#' + hazards2),NWF$('#' + chkbox2));});
	NWF$('#' + hazards3).change(function(){UpdateCheckbox(NWF$('#' + hazards3),NWF$('#' + chkbox3));});
	NWF$('#' + hazards4).change(function(){UpdateCheckbox(NWF$('#' + hazards4),NWF$('#' + chkbox4));});
});
function UpdateCheckbox(checkboxes,checkbox){
	var totalCount = checkboxes.find("input").length;
	var checkedCount = checkboxes.find("input:checked").length;
	if (checkedCount != totalCount) {
		checkbox.prop('checked', false);
		NWF.FormFiller.Functions.ProcessOnChange(checkbox);
	} else {
		checkbox.prop('checked', true);
		NWF.FormFiller.Functions.ProcessOnChange(checkbox);
	}
}
