NWF.FormFiller.Events.RegisterAfterReady(function(){
	var result = [];
	var depts = [deptHHS,deptPublicServices,deptPublicWorks,deptSheriff,deptER,deptCourt,deptFinance,deptAdmin,deptATNY,deptBoard];
	for (var x=0;x<depts.length;x++){calcDepts(result,depts[x]);}
	NWF$('#' + SelectAllDepts).change(function() {
		NWF$('.divs input').prop('checked',NWF$(this).prop('checked')).trigger('change');
		checkBoxes(deptAdmin,SelectAllDepts);
		checkBoxes(deptATNY,SelectAllDepts);
		checkBoxes(deptBoard,SelectAllDepts);
	});
	NWF$('.divs input').change(function() {
		if(this.id == divHHS){checkBoxes(deptHHS,divHHS);}
		else if(this.id == divPublicServices){checkBoxes(deptPublicServices,divPublicServices);}
		else if(this.id == divPublicWorks){checkBoxes(deptPublicWorks,divPublicWorks);}
		else if(this.id == divSheriff){checkBoxes(deptSheriff,divSheriff);}
		else if(this.id == divER){checkBoxes(deptER,divER);}
		else if(this.id == divCourt){checkBoxes(deptCourt,divCourt);}
		else if(this.id == divFinance){checkBoxes(deptFinance,divFinance);}
	});
	NWF$('#'+deptHHS+',#'+deptPublicServices+',#'+deptPublicWorks+',#'+deptSheriff+',#'+deptER+
		',#'+deptCourt+',#'+deptFinance+',#'+deptAdmin+',#'+deptATNY+',#'+deptBoard).change(function(){
		var thisID = this.id;
		calcDepts(result,thisID);
	});
});
function calcDepts(result,thisid){
	var strCountyUsers = '';
	var checked = NWF$('#' + thisid.replace(/_hid$/g,'')).find('input:checked').length;
	var total = NWF$('#' + thisid.replace(/_hid$/g,'')).find('input').length;
	if(checked == total){result[thisid] = 'One Division';}
	else if(checked == 1){result[thisid] = 'One Department';}
	else if(checked == 0){delete result[thisid];}
	else {result[thisid] = 'Multiple Departments';}
	if(arrSize(result)>1){strCountyUsers = 'Multiple Divisions';}
	else{strCountyUsers = result[Object.keys(result)[0]];}
	NWF$("[data-controlname='CountyUsers'] input").val(strCountyUsers);
	console.dir(checked + " of " + total + " checkboxes checked in current division = " + result[thisid]);
	console.dir("Number of Divisions: " + arrSize(result) + " - Overall Rating: " + NWF$("[data-controlname='CountyUsers'] input").val());	
}
function checkBoxes(dept,div){
	NWF$('#' + dept.replace(/_hid$/g,'') + ' input').prop('checked',NWF$('#' + div).prop('checked')).trigger('change');
}
function arrSize(arr){
	var size = 0, key;
	for(key in arr){if(arr.hasOwnProperty(key)) size++;}
	return size;
}
