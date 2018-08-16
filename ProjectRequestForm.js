NWF.FormFiller.Events.RegisterAfterReady(function(){
	/* Array to hold CountyUsers definition for each Division in DepartmentsAffected section */
	var result = [];

	/* Array to hold all DepartmentsAffected List Lookup ID variables */
	var depts = [deptHHS,deptPublicServices,deptPublicWorks,deptSheriff,deptER,deptCourt,deptFinance,deptAdmin,deptATNY,deptBoard];

	/* Loop through all DepartmentsAffected List Lookup fields to check for selected departments on form load */
	for (var x=0;x<depts.length;x++){calcDepts(result,depts[x],depts);}

	/* Replace all List Lookup links with <span> tags using the link text - Only used in Display Mode */
	NWF$('a[href*="RootFolder=*"]').each(function(){
		NWF$(this).after('<span style="display:inline-block;width: 100%;">' + NWF$(this).text() + '</span>');
		NWF$(this).remove();
	});

	/* On SelectAllDepts change, set all Division checkboxes equal to SelectAllDepts. Triggers change to cascade to Departments. */
	NWF$('#' + SelectAllDepts).change(function() {
		NWF$('.divs input').prop('checked',NWF$(this).prop('checked')).trigger('change');
		checkBoxes(deptAdmin,SelectAllDepts);
		checkBoxes(deptATNY,SelectAllDepts);
		checkBoxes(deptBoard,SelectAllDepts);
	});

	/* On any Division change, set its Departments equal to Division checkbox using checkBoxes function. Triggers Department change. */
	NWF$('.divs input').change(function() {
		if(this.id == divHHS){checkBoxes(deptHHS,divHHS);}
		else if(this.id == divPublicServices){checkBoxes(deptPublicServices,divPublicServices);}
		else if(this.id == divPublicWorks){checkBoxes(deptPublicWorks,divPublicWorks);}
		else if(this.id == divSheriff){checkBoxes(deptSheriff,divSheriff);}
		else if(this.id == divER){checkBoxes(deptER,divER);}
		else if(this.id == divCourt){checkBoxes(deptCourt,divCourt);}
		else if(this.id == divFinance){checkBoxes(deptFinance,divFinance);}
	});

	/* On any Department change, run calcDepts function to determine selected Department checkboxes */
	NWF$('#' + deptHHS + ',#' + deptPublicServices + ',#' + deptPublicWorks + ',#' + deptSheriff + ',#' + deptER +
		',#' + deptCourt + ',#' + deptFinance + ',#' + deptAdmin + ',#' + deptATNY + ',#' + deptBoard).change(function(){
		var thisID = this.id;
		calcDepts(result,thisID,depts);
	});
});

/* Function to calculate selected vs total Departments in current Division and store result into 'CountyUsers' Form Variable*/
function calcDepts(result,thisid,depts){
	var allIDs = '', strCountyUsers = '';
	
	/* Number of selected checkboxes in current Division */
	var checked = NWF$('#' + thisid.replace(/_hid$/g,'')).find('input:checked').length;

	/* Total checkboxes in current Division */
	var total = NWF$('#' + thisid.replace(/_hid$/g,'')).find('input').length;

	/* For each selected Department in ALL Divisions, split {ID;#Value;#ID;#Value} array to return only IDs as comma delimited string */
	for(var x in depts){
		if(NWF$('#' + depts[x]).val()){
			var arr = NWF$('#' + depts[x]).val().split(';#');
			for(var y=0;y<arr.length;y+=2){allIDs += arr[y] + ',';}
		}
	}

	/* Store allIDs comma delimited string into 'AllIDs' Form Variable with trailing comma trimmed to be stored directly into List*/
	NWF$("[data-controlname='AllIDs'] input").val(allIDs.replace(/,$/g,''));

	/* Determine CountyUsers definition for current Division and store in result associative array with ID as key */
	if(checked == total){result[thisid] = 'One Division';}
	else if(checked == 1){result[thisid] = 'One Department';}
	else if(checked == 0){delete result[thisid];}
	else {result[thisid] = 'Multiple Departments';}
	
	/* Determine CountyUsers definition for All Divisions and store in strCountyUsers string */
	if(NWF$('#' + SelectAllDepts).prop('checked')){strCountyUsers = 'All Users';}
	else if(arrSize(result)>1){strCountyUsers = 'Multiple Divisions';}
	else{strCountyUsers = result[Object.keys(result)[0]];}
	if(!strCountyUsers && {Common:IsEditMode}) {strCountyUsers = 'Less than One Department';}

	/* Set 'CountyUsers' Form Variable equal to strCountyUsers string */
	NWF$("[data-controlname='CountyUsers'] input").val(strCountyUsers);

	/* Output checked, total, current Division's CountyUsers definition, # of Divisions with selections, and final definition to console */
	console.dir(checked + ' of ' + total + ' checkboxes checked in current division = ' + result[thisid]);
	console.dir('Number of Divisions: ' + arrSize(result) + ' - Overall Rating: ' + NWF$("[data-controlname='CountyUsers'] input").val());	
}

/* Function used on SelectAllDepts and Division changes to set individual Department checkbox values. Triggers change to run calcDepts */
function checkBoxes(dept,div){
	NWF$('#' + dept.replace(/_hid$/g,'') + ' input').prop('checked',NWF$('#' + div).prop('checked')).trigger('change');
}

/* Function to calculate size of associative array */
function arrSize(arr){
	var size = 0, key;
	for(key in arr){if(arr.hasOwnProperty(key)) size++;}
	return size;
}
