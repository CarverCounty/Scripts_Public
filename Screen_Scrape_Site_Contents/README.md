# NEW Screen Scrape Script for SharePoint Site Contents
This process has been rebuilt to be automated. The old process is in the [archive folder](archive).


## Description
This is a simple solution for screen scraping the lists, libaries, and subsites from a SharePoint 2013 Site Contents page. This comes in handy for extracting a list of a site's contents for cleanup purposes.

This has only been tested on SharePoint 2013 using Chrome or Internet Explorer 11.


## How to Use:

The only downside to this method is that the page will not include your branding or navigation. If that's something you'd like, please use the Alternate Use instructions below.

1. Download the [SiteContents.html](https://raw.githubusercontent.com/CarverCounty/Scripts_Public/master/Screen_Scrape_Site_Contents/SiteContents.html) file.<sup>1</sup>

2. Upload the file to a library, like SiteAssets, within your SharePoint Farm.

3. Now simply open the file and enter the URL to a SharePoint site into the textbox, or click the Submit button to run the script for the current site.<sup>2</sup>

4. You can now copy the results using the Copy to Clipboard button and paste them into OneNote, Word, or another application to further detail notes about each item.


### Alternate Use:

1. Follow Step 1 above.

2. Upload the file to a library, like SiteAssets, at the __root of the site collection__.<sup>3</sup>

3. Copy the link to the file.

4. Create a new page on the site or determine an existing page<sup>4</sup> where you'll add the webpart.

5. Edit the page and add a new Content Editor webpart.

6. Edit the webpart and paste the link to the script into the Content Link field.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Content Link field in Webpart Editor](https://www.co.carver.mn.us/Home/ShowImage?id=11184)

7. Save the changes to the webpart and publish the page.

8. Now simply open the file and enter the URL to a SharePoint site, or click the Submit button to run the script for the current site.<sup>2</sup>

9. You can now copy the results using the Copy to Clipboard button and paste them into OneNote, Word, or another application to further detail notes about each item.

_<sup>1</sup>To 'download' the script, you'll need to copy the script text and paste it into a new text file saved as a `.html` extension._

_<sup>2</sup>For the Submit button to work on the current site, the script or page must be saved to the root of a document library. It cannot be placed in a folder._

_<sup>3</sup>The script can be uploaded to any individual site. However, by uploading it to the root of the site collection, the script can be referenced on any subsite without needing to upload it to multiple sites. Additionally, should the script need to be modified in the future, it only needs to be changed in one place to be applied to all subsites where it's being used._

_<sup>4</sup>This script will not work on a page that uses ```_layouts/15/start.aspx#``` in the URL. This happens on site homepages when the Minimal Download Strategy site feature is activated. Simply deactivate this feature, manually modify the URL, or add the webpart to a page other than the homepage._


## Results
![Results of final product](https://www.co.carver.mn.us/Home/ShowImage?id=11182)
