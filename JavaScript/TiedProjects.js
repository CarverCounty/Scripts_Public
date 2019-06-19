/*
	This script is saved in the Site Assets library of the Brightwork SharePoint site.
	It is referenced in the Custom JavaScript Includes field in the Tied Projects 
	Nintex Form for each Project Site that uses Tied Projects.
*/

/* Initialize global variables */
var currName        = '';
var currProjNum     = '';
var errPoint        = 'Page Load';
var idOptions       = ['**SelectValue**'];
var nfValOptions    = [''];
var parentSiteID    = '';
var tiedProj        = {};
var txtOptions      = ['Select Tied Project Site'];

/* Run the following function after the form is ready */
NWF.FormFiller.Events.RegisterAfterReady(function () {

	/* Determine whether or not the form is in Display Mode from URL */
	var isDisplayMode = document.location.pathname.indexOf("/DispForm.aspx") > -1;

	/* If form is not in Display Mode, run the 'runQueries' function when the page is ready */
	if(!isDisplayMode) {
		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () { });
		SP.SOD.executeOrDelayUntilScriptLoaded(runQueries, 'sp.js');
	}

	/* On drop down selection changed */
	NWF$('.ddlSites').change(function(){

		/* Get the current drop down value */
		var id = NWF$(this).val();

		/* If the value is not a project */
		if (id != '**SelectValue**') {

			/* Set the current Error Point value, write the ID to the console, and ... */
			errPoint = 'ddlSites Change';
			console.log("ID: " + id);

			/* Call the 'fillFormVars' function with the ID value */
			fillFormVars(id);
		}
	});
});



/* Function called to query 'Project Statement' list on current site */
function runQueries() {
	errPoint            = 'runQueries';
	var clientContext   = new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
	var oList           = clientContext.get_web().get_lists().getByTitle('Project Statement');
	var camlQuery       = new SP.CamlQuery();
	
	/* Execute query */
	this.collListItem   = oList.getItems(camlQuery);
	clientContext.load(collListItem);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, this.onSucceededProjStat),
		Function.createDelegate(this, this.onQueryFailed)
	);
}



/* Function called on successful query of 'Project Statement' to query 'Project Cache' for current project */
function onSucceededProjStat(sender, args) {
	errPoint                = 'onSucceededProjStat';
	var listItemEnumerator  = collListItem.getEnumerator();

	/* Loop through each queried record (there should only ever be one in 'Project Statement') */
	while (listItemEnumerator.moveNext()) {

		/* Get value from current item's 'BrightWorkProjectNumber' column */
		var oListItem       = listItemEnumerator.get_current();
		currName            = oListItem.get_item('Title');
		currProjNum         = oListItem.get_item('BrightWorkProjectNumber');
		console.log('Current BrightWork Project: ' + currProjNum + ' - ' + currName);
	}

	/* Set variables to query 'Project Cache' for current project */
	var clientContext       = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
	var oList               = clientContext.get_web().get_lists().getByTitle('Project Cache');
	var camlQuery           = new SP.CamlQuery();

	/* Setup CAML query to filter 'Project Cache' using queried 'BrightWorkProjectNumber' */
	camlQuery.set_viewXml(
		'<View><Query><Where><Eq>' +
			'<FieldRef Name=\'BrightWorkProjectNumber\'/>' +
			'<Value Type=\'Text\'>' + currProjNum + '</Value>' +
		'</Eq></Where></Query></View>'
	);

	/* Execute query */
	this.collListItem2      = oList.getItems(camlQuery);	
	clientContext.load(collListItem2);	
	clientContext.executeQueryAsync( 
		Function.createDelegate(this, this.onSucceededProjCache),
		Function.createDelegate(this, this.onQueryFailed)
	);
}



/* Function called on successful query of 'Project Cache' to requery 'Project Cache' for sibling projects */
function onSucceededProjCache(sender, args) {

	/* Test query results for multiple projects (there should only be one) */
	var resultCount         = collListItem2.get_count();

	/* Write error to console if more than one project found */
	if (resultCount > 1) {
		console.log('%cERROR: Duplicate Brightwork Project Number', 'color:red;font-weight:bold;');
		console.log('Number of ' + currProjNum + ' Sites: %c' + resultCount, 'color:red;font-weight:bold;');
	}
	errPoint                = 'onSucceededProjCache';
	var listItemEnumerator  = collListItem2.getEnumerator();

	/* Loop through each queried record (there should only ever be one) */
	while (listItemEnumerator.moveNext()) {

		/* Get value from current item's 'bwPCacheParentWebId' column */
		var oListItem       = listItemEnumerator.get_current();
		parentSiteID        = oListItem.get_item('bwPCacheParentWebId');
		console.log("Parent Site ID: " + parentSiteID);	
	}

	/* Set variables to requery 'Project Cache' for sibling projects */
	var clientContext       = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
	var oList               = clientContext.get_web().get_lists().getByTitle('Project Cache');
	var camlQuery           = new SP.CamlQuery();

	/* Setup CAML query to filter 'Project Cache' using queried 'bwPCacheParentWebId' */
	camlQuery.set_viewXml(
		'<View><Query>' +
			'<Where><And>' +
				'<Eq>' +
					'<FieldRef Name=\'bwPCacheParentWebId\'/>' +
					'<Value Type=\'Text\'>' + parentSiteID + '</Value>' +
				'</Eq>' +
				'<Neq>' +
					'<FieldRef Name=\'BrightWorkProjectNumber\'/>' +
					'<Value Type=\'Text\'>' + currProjNum + '</Value>' +
				'</Neq>' +
			'</And></Where>' + 
			'<OrderBy>' +	
				'<FieldRef Name=\'bwPCacheWebTitle\' Ascending=\'True\' />' + 
			'</OrderBy>' +
		'</Query></View>'
	);

	/* Execute query */
	this.collListItem3      = oList.getItems(camlQuery);
	clientContext.load(collListItem3);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, this.onSucceededSiblings),
		Function.createDelegate(this, this.onQueryFailed)
	);
}



/* Function called on successful query of 'Project Cache' to query 'Tied Projects' for current ties */
function onSucceededSiblings(sender, args) {
	errPoint                    = 'onSucceededSiblings';
	var listItemEnumerator      = collListItem3.getEnumerator();

	/* Loop through each queried record */
	while (listItemEnumerator.moveNext()) {

		/* Get values from current item's ID, 'bwPCacheWebTitle', 'bwPCacheWebScope', and 'BrightWorkProjectNumber' columns */
		var oListItem           = listItemEnumerator.get_current();
		projSiteID              = oListItem.get_id();
		projSiteTitle           = oListItem.get_item('bwPCacheWebTitle');
		tiedProj[projSiteID]    = {
			'URL': oListItem.get_item('bwPCacheWebScope'),
			'ProjNum':oListItem.get_item('BrightWorkProjectNumber')
		};

		/* Store queried values into global array variables */
		idOptions.push(projSiteID);
		txtOptions.push(projSiteTitle);
		nfValOptions.push(projSiteID + ';#' + projSiteTitle);
		console.log("Project: " + projSiteID + ';#' + projSiteTitle);
	}

	console.log(tiedProj);

	/* Set variables to query 'Tied Projects' for current ties */
	var clientContext           = new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
	var oList                   = clientContext.get_web().get_lists().getByTitle('Tied Projects');
	var camlQuery               = new SP.CamlQuery();
	
	/* Execute query */
	this.collListItem4          = oList.getItems(camlQuery);
	clientContext.load(collListItem4);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, this.onSucceededTiedProjects),
		Function.createDelegate(this, this.onQueryFailed)
	);
}	 	



/* Function called on successful query of 'Tied Projects' to fill Tied Project Name drop down */
function onSucceededTiedProjects(sender, args) {
	errPoint                = 'onSucceededTiedProjects';
	var listItemEnumerator  = collListItem4.getEnumerator();
	var tiedProjects        = [];
	var optionHTML          = '';

	/* Loop through each queried record */
	while (listItemEnumerator.moveNext()) {

		/* Get value from 'Project_x0020_Name' column */
		var oListItem = listItemEnumerator.get_current();
		tiedProjects.push(oListItem.get_item('Project_x0020_Name'));
		console.log("Tied Project: " + oListItem.get_item('Project_x0020_Name'));
	}

	/* For each tied project in 'txtOptions' global variable */
	for (var i=0;i<txtOptions.length;i++) {

		/* If sibling project does not already exist as tied project */
		if (tiedProjects.indexOf(txtOptions[i]) < 0) {

			/* Add sibling project name to list of sibling projects available to tie */
			optionHTML += '<option value="' + idOptions[i] + 
				'" data-nfchoicevalue="' + nfValOptions[i] + '">' + txtOptions[i] + '</option>';
		}
	}

	/* Empty Tied Project Name drop down and fill with newly created list of untied sibling projects */
	NWF$('.ddlSites').empty().append(optionHTML);
}



/* Function called to fill Nintex Form variables - Used to fill additional list columns with queried data */
function fillFormVars(id) {
	errPoint = 'fillFormVars';

	/* Set Nintex Form variables to currently selected project site's metadata values */
	NWF$("[data-controlname='CurrentSite'] input").val(currName);
	NWF$("[data-controlname='ParentID'] input").val(parentSiteID);
	NWF$("[data-controlname='URL'] input").val(tiedProj[id]['URL']);
	NWF$("[data-controlname='ProjectNumber'] input").val(tiedProj[id]['ProjNum']);

	/* Write values to console */
	console.log("URL: " + NWF$("[data-controlname='URL'] input").val());
	console.log("Parent ID: " + NWF$("[data-controlname='ParentID'] input").val());
	console.log("Current Site: " + NWF$("[data-controlname='CurrentSite'] input").val());
	console.log("Project Number: " + NWF$("[data-controlname='ProjectNumber'] input").val());
}



/* Function called when any query fails */
function onQueryFailed(sender, args) {
	var optionHTML = '<option value="**SelectValue**">Brightwork Project Number Required</option>';
	
	/* Disable Tied Project Name drop down and replace options with red error message. */
	NWF$('.ddlSites').empty().append(optionHTML).prop('disabled',true).css('color','red');
	console.log('Tied Projects Error in ' + errPoint + ' function: ' + args.get_message() + '\n' + args.get_stackTrace());
}
