# Screen Scrape Script for SharePoint Site Contents

This is a very, very basic solution for screen scraping the lists, libaries, and sites from a SharePoint 2013 Site Contents page. We've used this for extracting a simple list of a site's contents for cleanup purposes.

This has not been tested in any other environment. 

It requires you to copy code from the Site Contents page so that this solution can parse the data and return two bulleted lists. See example below.

## JSFiddle Resources
Prepped JSFiddle Page: [https://jsfiddle.net/cmgj5ez0/1](https://jsfiddle.net/cmgj5ez0/1)

If you're starting from a new JSFiddle, the [html file](html.html) contents need to be copied into the HTML pane and the [javascript file](javascript.js) contents need to be copied into the JavaScript pane. You will also need to add JQuery to the JavaScript window.

## Requirements:
- Must be used with JSFiddle as it is currently written
  - Time has not permitted this to be built out as a local application, but it could be
- You must be in Chrome for this to work step by step
  - However, you can tweak the instructions for other browsers
- This solution requires JQuery

## How to Use:
1.	Go to the Site Contents page on one of your SharePoint sites.

2.	Right click on the ‘add an app’ tile and select Inspect.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10692)

3.	In the code, look for the ```<table id="appsTable" cellspacing="0" cellpadding="0" style="border-collapse:collapse;" border="0" class="ms-viewlsts">``` line of code, which should be slightly above the tile you selected.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10694)

4.	Right click the “appsTable” line of code and select Copy -> Copy Element.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10696)

5.	Now click the JSFiddle link at the top of this page, or go to a new JSFiddle where you've already prepped the code.

6.	Paste the code you copied in Step 4 _after_ line 4 in the HTML pane, and enter your SharePoint domain between the quotes for the ```myDomain``` variable in the JavaScript section. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_*If you don't enter your SharePoint domain, the links in the results lists will not work._

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10698)

7.	Click the Run button at the top left of the page.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10700)

8.	 Your results will appear in the pane on the right side of the page.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10702)

9.	The entire page should look similar to this, but with your domain and results:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![](https://www.co.carver.mn.us/Home/ShowImage?id=10704)

10.  You can now copy and paste the results pane contents into a OneNote, Word, or other application to further detail notes about each item. 
