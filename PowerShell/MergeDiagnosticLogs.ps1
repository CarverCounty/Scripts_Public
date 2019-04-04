#Testing PowerShell script for merging SharePoint log files.
#Features dynamic prompting and ability to specify desired start and end times.

DO {
	$path = Read-Host "Your Name"
} While (-Not $path)

$topic = Read-Host "Log Topic (optional)"

if ($path -and $topic) {
	$path = "E:\Merged Log Files\" + ($topic -replace '\s','') + "-" + ($path -replace '\s','') + "-" + (Get-Date -uformat %m.%d.%Y.%H%M)
} elseif ($path -and -not $topic) {
	$path = "E:\Merged Log Files\" + ($path -replace '\s','') + "-" + (Get-Date -uformat %m.%d.%Y.%H%M)
} else {
	$path = "E:\Merged Log Files\" + "MergedLogFile" + (Get-Date -uformat %m.%d.%Y.%H%M) + ".log"
}

$date = Get-Date -uformat %m/%d/%Y

DO {
	$startTime = Read-Host "Start Time (ex: 13:46)"
	$startTime = Get-Date $startTime
} While (-Not $startTime)
	
DO {
	$endTime = Read-Host "End Time (ex: 14:02)"
	$endTime = Get-Date $endTime
} While ($startTime -ge $endTime)


$startTime = $date + " " + $startTime.ToString('HH:mm')

$endTime = $date + " " + $endTime.ToString('HH:mm')

Write-Host "-Path $path -StartTime $startTime -EndTime $endTime"

Merge-SPLogFile -Path $path -StartTime $startTime -EndTime $endTime

