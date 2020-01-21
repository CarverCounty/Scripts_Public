#This script will kill ALL site workflows (SharePoint and Nintex) on the entire site.
#This code is an excerpt taken from Vadim Tabakman's blog: 
#http://www.vadimtabakman.com/powershell-cancelling-all-running-workflows.aspx
#His script is much more extensive and will kill all workflows on all sites across the site collection.
#This excerpt has been tweaked to prompt for site.

Add-PSSnapin Microsoft.SharePoint.Powershell -ea SilentlyContinue
clear

#Prompts
DO {$path = Read-Host "Path to Site";} While (-Not $path)
DO {$sure = Read-Host "Are you sure you want to kill ALL site workflows running on this site? (y/n)";} While (-Not $sure)

if ($sure -eq "y" -or $sure -eq "yes") {
    $sure = '';
    DO {
        clear;
	    $sure = Read-Host "Seriously.`nThis will kill every currently running instance of a site workflow on this site, and will send termination emails. `nAre you really sure? (YES to continue)";
    } While (-Not $sure)
    
    if ($sure -ne "YES") {
        Write-Host "Script Terminated";
        Exit;
    }
} else {
    Write-Host "Script Terminated";
    Exit;
}

#Kill Site Workflows
$site = Get-SPSite $path;
$spWebCollection = $site.AllWebs;
$web = $spWebCollection[0];

$spWorkflowCollection = $web.Workflows;
if($spWorkflowCollection)
{
  $iWorkflowCount = $spWorkflowCollection.Count;
  $w = 0;

  do
  { 
	$workflow = $spWorkflowCollection[$w]; 
	if($workflow)
	{
	  if($workflow.InternalState -ne 'Completed' -and $workflow.InternalState -ne 'Cancelled')
	  {
		[Microsoft.SharePoint.Workflow.SPWorkflowManager]::CancelWorkflow($workflow); 
		Write-Host Workflow $w Cancelled of $iWorkflowCount;
	  }
	}
	$w++;
  } 
  while ($w -lt $iWorkflowCount)
}

$web.Dispose();
$site.Dispose()
Write-Host "Completed"
