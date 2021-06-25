/* 
   Source: https://www.linkedin.com/pulse/add-icons-view-columns-dynamics-crm-365-ahmad-sammour/ 
   Filename: cc_green_acres
   Location: Web Resources
   Tracking Changes: https://github.com/CarverCounty/Scripts_Public/blob/master/Dynamics/Repository/cc_green_acres.js
*/

function RowInfo(rowVal, userlcid) {

var imageName = "";
var tooltipValue = "";
var resultarray = null;
 
try {

var row = JSON.parse(rowVal);

/* 
   'ta_greenacres' is the field/column name
   This value needs to be changed if this script is used as a template for another view.
*/
var rowValue = row.ta_greenacres;

switch(rowValue){

	// 'Yes' is the cell value being looked for.
	case 'Yes':

		// 'cc_green_acres' is the name of the Web Resource icon file
		imageName = "cc_green_ok";

		// The tooltipValue is hoverover text for the image
		tooltipValue = "Yes Green Acres";
		break;
	case 'No':
		imageName = "cc_red_danger";
		tooltipValue = "No Green Acres";
		break;
	default:
		break;
}
 
resultarray = [imageName, tooltipValue];

} catch (e) {

}

return resultarray;
}
