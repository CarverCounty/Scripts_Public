import urllib, urllib2, json, arcpy

#Parameters
hostedFeatureService = arcpy.GetParameterAsText(0)
agsService = arcpy.GetParameterAsText(1)
username = arcpy.GetParameterAsText(2)
password = arcpy.GetParameterAsText(3)
baseURL = arcpy.GetParameterAsText(4)
referer = arcpy.GetParameterAsText(5)
fieldName = arcpy.GetParameterAsText(6)

#generate token for hosted service
if hostedFeatureService == 'true':
    try:
        tokenURL = 'https://www.arcgis.com/sharing/rest/generateToken'
        params = {'f': 'pjson', 'username': username, 'password': password, 'referer': referer, 'expiration': 21600}
        req = urllib2.Request(tokenURL, urllib.urlencode(params))
        response = urllib2.urlopen(req)
        data = json.load(response)
        token = data['token']
    except:
        token = ''

#generate token for AGS service
if agsService == 'true':
    try:
        server = baseURL.split("//")[1].split("/")[0]        
        tokenURL = 'http://' + server + '/arcgis/admin/generateToken'
        params = {'username': username, 'password': password, 'client': 'requestip', 'f': 'pjson', 'expiration': 1440}
        req = urllib2.Request(tokenURL, urllib.urlencode(params))
        response = urllib2.urlopen(req)
        data = json.load(response)        
        token = data['token']
    except:
        token = ''

#create OID list
OIDs = []

url = baseURL
params = {'f': 'pjson', 'token': token}
req = urllib2.Request(url, urllib.urlencode(params))
response = urllib2.urlopen(req)
data = json.load(response)
#check if service has attachments
if data["hasAttachments"] == 1:
    params = {'where': '1=1', 'returnIdsOnly': 'true', 'token': token, 'f': 'json'}
    req = urllib2.Request(url + "/query", urllib.urlencode(params))
    response = urllib2.urlopen(req)
    data = json.load(response)
    #obtain OBJECTID field
    objectidField = data['objectIdFieldName']
    data['objectIds'].sort()
    for OID in data['objectIds']:
        OIDs.append(OID)

#iterate through OIDs to see which contain attachments
for OID in OIDs:
    url = baseURL + "/" + str(OID) + "/attachments"    
    params = {'f': 'pjson', 'token': token}
    req = urllib2.Request(url, urllib.urlencode(params))
    response = urllib2.urlopen(req)
    data = json.load(response)
    if len(data['attachmentInfos']) > 0:
        #obtain attachment ID
        id = data['attachmentInfos'][0]['id']

        #update Picture field with URL to attachment
        updateURL = baseURL + '/updateFeatures'
        pictureURL = url + "/" + str(id) + "?token=" + token
        updates = [{"attributes" : {str(objectidField): OID, str(fieldName): str(pictureURL)}}]
        params = {'features': updates, 'token': token, 'f': 'json'}
        req = urllib2.Request(updateURL, urllib.urlencode(params))
        response = urllib2.urlopen(req)
        data = json.load(response)
        arcpy.AddMessage("ObjectID: " + str(data['updateResults'][0]['objectId']) + ", success: " + str(data['updateResults'][0]['success']))

