#This script will delete ALL items from the specified list/library.
#It will prompt for the site path and list/library name.
#It will also prompt TWICE for your confirmation to run.

Add-PSSnapin Microsoft.SharePoint.Powershell -ea SilentlyContinue
clear

#Prompts
DO {$site = Read-Host "Path to Site";} While (-Not $site)
DO {$library = Read-Host "Library Name";} While (-Not $library)
DO {$sure = Read-Host "Are you sure you want to delete ALL items from this list/library? (y/n)";} While (-Not $sure)

if ($sure -eq "y" -or $sure -eq "yes") {
    $sure = '';
    DO {
        clear;
	    $sure = Read-Host "Seriously.`nThis will delete EVERYTHING in this list/library. Are you really sure? (YES to continue)";
    } While (-Not $sure)
    
    if ($sure -ne "YES") {
        Write-Host "Script Terminated";
        Exit;
    }
} else {
    Write-Host "Script Terminated";
    Exit;
}
clear;
$start = Get-Date -Format s;
Write-Host "$start - SCRIPT IS PURGING EVERYTHING!";

#Delete Items
$web = get-spweb $site;
$list = $web.lists[$library];
$query = New-Object Microsoft.SharePoint.SPQuery;
$query.ViewAttributes = "Scope='Recursive'";
$query.RowLimit = 1000;
$query.ViewFields = "<FieldRef Name='ID'/>";
$query.ViewFieldsOnly = $true;
DO {
   $listItems = $list.GetItems($query);
   $query.ListItemCollectionPosition = $listItems.ListItemCollectionPosition;
   foreach($item in $listItems)
   {
     Write-Host "Deleting Item - $($item.Id)";
     $list.GetItemById($item.Id).delete();
   }
}
while ($query.ListItemCollectionPosition -ne $null) 

Write-Host "$start - Started";
Write-Host "$(Get-Date -Format s) - Completed";
