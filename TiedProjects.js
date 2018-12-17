var clientContext = new SP.ClientContext(_spPageContextInfo.webServerRelativeUrl);
var oList = clientContext.get_web().get_lists().getByTitle('Project Statement');
var camlQuery = new SP.CamlQuery();
this.collListItem = oList.getItems(camlQuery);
clientContext.load(collListItem);
clientContext.executeQueryAsync(Function.createDelegate(this, this.onSucceededProjStat),
	Function.createDelegate(this, this.onQueryFailed));

function onSucceededProjStat(sender, args) {
	var listItemEnumerator = collListItem.getEnumerator();
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var bwProjectNum = oListItem.get_item('BrightWorkProjectNumber');
		console.log("BrightWork Project Number: " + bwProjectNum);
	}

	var clientContext = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
	var oList = clientContext.get_web().get_lists().getByTitle('Project Cache');
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(
		'<View><Query><Where><Eq>' +
			'<FieldRef Name=\'BrightWorkProjectNumber\'/>' + 
			'<Value Type=\'Text\'>' + bwProjectNum + '</Value>' +
		'</Eq></Where></Query></View>');

	this.collListItem2 = oList.getItems(camlQuery);
	clientContext.load(collListItem2);
	clientContext.executeQueryAsync(Function.createDelegate(this, this.onSucceededProjCache),
		Function.createDelegate(this, this.onQueryFailed));
}


function onSucceededProjCache(sender, args) {
	var listItemEnumerator = collListItem2.getEnumerator();
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var parentSiteID = oListItem.get_item('bwPCacheParentWebId');
		console.log("Parent Site ID: " + parentSiteID);
		var bwProjectNum = oListItem.get_item('BrightWorkProjectNumber');
		console.log("BrightWork Project Number: " + bwProjectNum);
	}

	var clientContext = new SP.ClientContext(_spPageContextInfo.siteServerRelativeUrl);
	var oList = clientContext.get_web().get_lists().getByTitle('Project Cache');
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(
		'<View><Query>' + 
			'<Where>' + 
				'<And>' +			
					'<Eq>' +
						'<FieldRef Name=\'bwPCacheParentWebId\'/>' + 
						'<Value Type=\'Text\'>' + parentSiteID + '</Value>' +
					'</Eq>' + 
					'<Neq>' +
						'<FieldRef Name=\'BrightWorkProjectNumber\'/>' + 
						'<Value Type=\'Text\'>' + bwProjectNum + '</Value>' +
					'</Neq>' +
				'</And>' +
			'</Where>' + 
			'<OrderBy>' +
				'<FieldRef Name=\'bwPCacheWebTitle\' Ascending=\'True\' />' +
			'</OrderBy>' +
		'</Query></View>');

	this.collListItem3 = oList.getItems(camlQuery);
	clientContext.load(collListItem3);
	clientContext.executeQueryAsync(Function.createDelegate(this, this.onSucceededSiblings),
		Function.createDelegate(this, this.onQueryFailed));
}

function onSucceededSiblings(sender, args) {
	var listItemEnumerator = collListItem3.getEnumerator();
	var sites = document.getElementById(ddlSites)
	var option = document.createElement('option');
	sites.options.length = 0;
	option.value = '';
	option.text = 'Select Tied Project Site';
	sites.add(option);

	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		projSiteTitle = oListItem.get_item('bwPCacheWebTitle');
		console.log("Project Title: " + projSiteTitle);

		var option = document.createElement('option');
		option.value = '';
		option.text = projSiteTitle;
		sites.add(option);
	}
}		

function onQueryFailed(sender, args) {
	console.log('Tied Projects Error: ' + args.get_message() + '\n' + args.get_stackTrace());
}
