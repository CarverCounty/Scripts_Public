var errPoint		= 'Page Load';
var parentSiteID	= '';
var currName		= '';
var currProjNum		= '';
var tiedProj		= {};
var txtOptions		= ['Select Tied Project Site'];
var idOptions		= ['**SelectValue**'];
var nfValOptions	= [''];


NWF.FormFiller.Events.RegisterAfterReady(function () {
	var isDisplayMode = document.location.pathname.indexOf("/DispForm.aspx") > -1;
	if(!isDisplayMode) {
		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () { });
		SP.SOD.executeOrDelayUntilScriptLoaded(runQueries, 'sp.js');
	}
	
	NWF$('.ddlSites').change(function(){
		var id = NWF$(this).val();
		if (id != '**SelectValue**') {
			errPoint = 'ddlSites Change';
			console.log("ID: " + id);
			fillFormVars(id);
		}
	});
});

function runQueries() {
	errPoint		= 'runQueries';
	var clientContext	= new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
	var oList		= clientContext.get_web().get_lists().getByTitle('Project Statement');
	var camlQuery		= new SP.CamlQuery();
	this.collListItem	= oList.getItems(camlQuery);
	clientContext.load(collListItem);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, this.onSucceededProjStat),
		Function.createDelegate(this, this.onQueryFailed)
	);
}

function onSucceededProjStat(sender, args) {
	errPoint		= 'onSucceededProjStat';
	var listItemEnumerator	= collListItem.getEnumerator();
	
	while (listItemEnumerator.moveNext()) {
		var oListItem	= listItemEnumerator.get_current();
		currName	= oListItem.get_item('Title');
		currProjNum	= oListItem.get_item('BrightWorkProjectNumber');
		console.log("BrightWork Project Number: " + currProjNum);
	}
	
	var clientContext	= new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);	
	var oList		= clientContext.get_web().get_lists().getByTitle('Project Cache');	
	var camlQuery		= new SP.CamlQuery();	
	camlQuery.set_viewXml(
		'<View><Query><Where><Eq>' +
			'<FieldRef Name=\'BrightWorkProjectNumber\'/>' +
			'<Value Type=\'Text\'>' + currProjNum + '</Value>' +
		'</Eq></Where></Query></View>'
	);

	this.collListItem2 = oList.getItems(camlQuery);	
	clientContext.load(collListItem2);	
	clientContext.executeQueryAsync( 
		Function.createDelegate(this, this.onSucceededProjCache),
		Function.createDelegate(this, this.onQueryFailed)
	);
}

function onSucceededProjCache(sender, args) {	
	errPoint		= 'onSucceededProjCache';
	var listItemEnumerator	= collListItem2.getEnumerator();
	
	while (listItemEnumerator.moveNext()) {
		var oListItem	= listItemEnumerator.get_current();	
		parentSiteID	= oListItem.get_item('bwPCacheParentWebId');	
		console.log("Parent Site ID: " + parentSiteID);	
	}
	
	var clientContext	= new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);	
	var oList		= clientContext.get_web().get_lists().getByTitle('Project Cache');	
	var camlQuery		= new SP.CamlQuery();	
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
	this.collListItem3 = oList.getItems(camlQuery);	
	clientContext.load(collListItem3);	
	clientContext.executeQueryAsync( 
		Function.createDelegate(this, this.onSucceededSiblings),
		Function.createDelegate(this, this.onQueryFailed)
	);
}

function onSucceededSiblings(sender, args) {
	errPoint		= 'onSucceededSiblings';
	var listItemEnumerator	= collListItem3.getEnumerator();
	
	while (listItemEnumerator.moveNext()) {
		var oListItem		= listItemEnumerator.get_current();
		projSiteID 		= oListItem.get_id();
		projSiteTitle		= oListItem.get_item('bwPCacheWebTitle');
		tiedProj[projSiteID]	= {
			'URL': oListItem.get_item('bwPCacheWebScope'),
			'ProjNum':oListItem.get_item('BrightWorkProjectNumber')
		};
		
		idOptions.push(projSiteID);
		txtOptions.push(projSiteTitle);
		nfValOptions.push(projSiteID + ';#' + projSiteTitle);
		console.log("Project: " + projSiteID + ';#' + projSiteTitle);
	}
	
	console.log(tiedProj);
	
	var clientContext	= new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
	var oList		= clientContext.get_web().get_lists().getByTitle('Tied Projects');
	var camlQuery		= new SP.CamlQuery();
	this.collListItem4	= oList.getItems(camlQuery);
	clientContext.load(collListItem4);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, this.onSucceededTiedProjects),
		Function.createDelegate(this, this.onQueryFailed)
	);
}	 	


function onSucceededTiedProjects(sender, args) {
	errPoint		= 'onSucceededTiedProjects';
	var listItemEnumerator	= collListItem4.getEnumerator();
	var tiedProjects	= [];
	
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		tiedProjects.push(oListItem.get_item('Project_x0020_Name'));
		console.log("Tied Project: " + oListItem.get_item('Project_x0020_Name'));
	}

	var optionHTML = '';
	for (var i=0;i<txtOptions.length;i++) {
		if (tiedProjects.indexOf(txtOptions[i]) < 0) {
			optionHTML += '<option value="' + idOptions[i] + 
				'" data-nfchoicevalue="' + nfValOptions[i] + '">' + txtOptions[i] + '</option>';
		}
	}
	NWF$('.ddlSites').empty().append(optionHTML);
}

function fillFormVars(id) {
	errPoint = 'fillFormVars';

	NWF$("[data-controlname='CurrentSite'] input").val(currName);
	NWF$("[data-controlname='ParentID'] input").val(parentSiteID);
	NWF$("[data-controlname='URL'] input").val(tiedProj[id]['URL']);
	NWF$("[data-controlname='ProjectNumber'] input").val(tiedProj[id]['ProjNum']);

	console.log("URL: " + NWF$("[data-controlname='URL'] input").val());
	console.log("Parent ID: " + NWF$("[data-controlname='ParentID'] input").val());
	console.log("Current Site: " + NWF$("[data-controlname='CurrentSite'] input").val());
	console.log("Project Number: " + NWF$("[data-controlname='ProjectNumber'] input").val());
}

function onQueryFailed(sender, args) {
	console.log('Tied Projects Error in ' + errPoint + ' function: ' + args.get_message() + '\n' + args.get_stackTrace());
}
