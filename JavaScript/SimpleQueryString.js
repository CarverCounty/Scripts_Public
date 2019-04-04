/*Requires a reference to jQuery*/
/*qs will be an object with all query strings
EXAMPLE: http://<someurl>/?x=-93.25&y=44.56&zoomFactor=8
qs = {
    x: -93.25,
    y: 44.56,
    zoomFactor: 8
}
*/
var qs = getQS(); 
function getQS() {
    var url = window.location.toString();
    var query_string = url.split("?");
    var qsparamslist = {};
    if (query_string.length > 1) {
        var qsparams = query_string[1].split("&");
        $.each(qsparams, function (index, val) {
            var param_item = val.split("=");
            qsparamslist[param_item[0]] = param_item[1];
        });
    }
    return qsparamslist;
}
