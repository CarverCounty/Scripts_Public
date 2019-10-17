/*
	Used in ITSM to customize the ITSM Notifications dashboard.
	This script is located under Settings -> Customizations -> Customize the System -> Web Resources.
	To find it in the list, you can filter the Display Name column by 'carv' or 'Notification'.
*/
// JavaScript source code
function extend(destination, source) {
    "use strict";
    var toString = Object.prototype.toString,
        objTest = toString.call({});
    for (var property in source) {
        if (source[property] && objTest === toString.call(source[property])) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

var Provance = window.Provance || {};

// This file will contain all the supporting methods for the Ticket (Incident)
extend(Provance, {
    CRM: {
        ITSM: {
            View: {
                ShowColorCodingOnITSMNotifications: function (rowData, userLCID) {
                    "use strict";
                    debugger;
                    var str = JSON.parse(rowData);
                    var coldata = str["carv_outagechangetype"];
                    var imgName = "";
                    var tooltip = "";
                    switch (coldata) {
                        case "Unplanned":
                            imgName = "apitil_/icons/priority1_16x16.png";
                            break;
                        case "Planned":
                            imgName = "apitil_/icons/priority3_16x16.png";
                            break;
                        case "Normal":
                            imgName = "apitil_/icons/priority4_16x16.png";
                            break;
                        default:
                            imgName = "";
                            break;
                    }
                    var resultarray = [imgName, tooltip];
                    return resultarray;
                }
            }
        }
    }
});