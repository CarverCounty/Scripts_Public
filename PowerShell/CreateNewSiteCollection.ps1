#Testing PowerShell script for creating new site collection.
#Features dynamic prompting and ability to specify desired content database.
DO {
	$url = Read-Host "URL for New Site Collection"
} While ($url -notmatch 'http')

DO {
	$ContentDatabase = Read-Host "Content Database Name"
} While (-Not $ContentDatabase)

DO {
	$WebsiteName = Read-Host "Site Display Name"
} While (-Not $WebsiteName)

$WebsiteDesc = Read-Host "Site Description (optional)"
Write-Host "`nList of template names https://bit.ly/2zvV2Uo"

DO {
	$Template = Read-Host "Template Name (ex. STS#0)"
} While ($Template -notmatch '#\d')

DO {
	$PrimaryLogin = Read-Host "Primary Admin (domain\username)"
} While ($PrimaryLogin -notmatch '[A-z]+\\[A-z]+')

DO {
	$PrimaryEmail = Read-Host "Primary Admin Email (optional)"
} While ($PrimaryEmail -notmatch '@' -And $PrimaryEmail)

DO {
	$SecondaryLogin = Read-Host "Secondary Admin (optional)"
} While ($SecondaryLogin -notmatch '[A-z]+\\[A-z]+' -And $SecondaryLogin)

if ($SecondaryLogin) {
	DO {
		$SecondaryEmail = Read-Host "Secondary Admin Email (optional)"
	} While ($SecondaryEmail -notmatch '@' -And $SecondaryEmail -And $SecondaryLogin)
}

New-SPSite -Url $url –ContentDatabase $ContentDatabase -Name $WebsiteName –Description $WebsiteDesc  -Template $Template -OwnerAlias $PrimaryLogin –OwnerEmail $PrimaryEmail -SecondaryOwnerAlias $SecondaryLogin -SecondaryOwnerEmail $SecondaryEmail
