/* Enter Your Domain Here */
var myDomain = '';

/* Hide copied code from Site Contents in results window */
$('table#appsTable').css('display','none');

/* Add bold title to lists and libraries section on the right */
$('#siteContents').append('<p></p><strong>LISTS & LIBRARIES</strong><br><br>');

/* Find each list and library... */
$('div[id].ms-vl-appinfo').each(function(){

	/* Store the data in variables using jQuery */
	var linkData	= $('#' + this.id + ' .ms-vl-apptitleouter a.ms-vl-apptitle');
	var metaData	= $('#' + this.id + ' div.ms-vl-appstatus');
	var objName		= '';

	/* If myDomain exists */
	if(myDomain) {

		/* Create the linked name */
		objName = '<a href=\'' + myDomain + linkData.prop('href').replace('https://fiddle.jshell.net/','') + 
      	'\' target=\'_blank\'>' + linkData.text().trim() + '</a> - ';

	/* Otherwise, if it doesn't exist */
	} else {

		/* Only add the name */
		objName = linkData.text().trim() + ' - ';
	}

	/* Append the name, link if it exists, and metadata in a list to the section on the right */	
	$('#siteContents').append(

		/* Create the list item */
		'<li>' + objName +
			
      /* Format the metadata */
			metaData[0].innerHTML.trim() + ' - ' + 
      metaData[1].innerHTML.trim().replace('Modified','') + 
      
    /* Close the list item */
    '</li>'
  );
});

/* Add bold title to sites section */
$('#siteContents').append('<p>&nbsp;</p><p>&nbsp;</p><strong>SITES</strong><br><br>');

/* Find each site, build a link, and add it to the page like above */
$('.ms-itmhover .ms-vb-icon a.ms-draggable').each(function(){
	$('#siteContents').append('<li><a href=\'' + 
  	$(this).prop('href') + 
    '\' target=\'_blank\'>' + 
    $(this).text().trim() + 
    '</a></li>'
  );
});
