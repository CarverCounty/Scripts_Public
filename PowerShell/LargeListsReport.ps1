# This script will return a CSV report of all lists on the Web Application with more than 2000 items.

Add-PSSnapin Microsoft.SharePoint.Powershell -ea SilentlyContinue

# Path where CSV report will be saved (enter your default location)
$path = "";

# Query All Lists with Greater Than This Number of Records
$min = 2000;

# Prompt for Site Path and Name of Report File
DO {$site = Read-Host "Path to Site";} While (-Not $site)
DO {$name = Read-Host "Name of File";} While (-Not $name)

# Build Report Path and Name
$path = $path + $name + ".csv";

# Query Lists and Build Report
Get-SPWebApplication $site | Get-SPSite -Limit All | Get-SPWeb -Limit All `
    | Foreach-object { $_.Lists | Select @{N="Url";E={$_.ParentWeb.url+"/"+$_.RootFolder.Url} }, Title, ItemCount } `
        | Where {$_.ItemCount -gt $min} | sort ItemCount -Descending | Export-csv -Path $path -NoTypeInformation
