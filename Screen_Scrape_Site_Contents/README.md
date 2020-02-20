# NEW Screen Scrape Script for SharePoint Site Contents
This process has been rebuilt to be automated. The old process is in the [archive folder](archive).


## Description
This is a simple solution for screen scraping the lists, libaries, and subsites from a SharePoint 2013 Site Contents page. This comes in handy for extracting a list of a site's contents for cleanup purposes.

This has not been tested in any other environment.


## How to Use:
1. Download the [SiteContents.html](SiteContents.html) file.

2. Upload the file to a library, like SiteAssets, at the root of the site collection.*

3. Copy the link to the file.

4. Create a new page on the site or determine an existing page where you'll add the webpart.

5. Edit the page and add a new Content Editor webpart.

6. Edit the webpart and paste the link into the Content Link field.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![Content Link field in Webpart Editor](https://www.co.carver.mn.us/Home/ShowImage?id=11184)

7. Save the changes to the webpart and publish the page.

8. You can now copy and paste the results into OneNote, Word, or another application to further detail notes about each item.

_*The script can be uploaded to any individual site. However, by uploading it to the root of the site collection, the script can be referenced on any subsite without needing to upload it to multiple sites. Additionally, should the script need to be modified in the future, it only needs to be changed in one place to be applied to all subsites where it's being used._


## Results
![Results of final product](https://www.co.carver.mn.us/Home/ShowImage?id=11182)


## Known Bug
This script will not work on a page that uses ```_layouts/15/start.aspx#``` in the URL. This happens on site homepages when the Minimal Download Strategy site feature is activated. Simply deactivate this feature, manually modify the URL, or add the webpart to a page other than the homepage.
