
enum patch_action {
    rebase
    update  # copies over new version of joplin_inject_code.ps1 without extracting asar (faster)
}



####  script variables
$customJS_path = '.\\joplin_inject_code.js'
$action = [patch_action]::rebase
####



$base_path = 'C:\Users\alecm\AppData\Local\Programs\Joplin\resources'


if ($action -eq [patch_action]::rebase) {
    if ((Get-Process | where ProcessName -like "*Jop*" | measure).Count -gt 0) {
      Write-Warning -Message "Be sure to close Joplin while rebasing"  
      exit
    }
    
    write-host [+] removing old app directory
    rm -Recurse -Force -Path $base_path\app\ 2>$null

    if (!(Test-Path -path "$base_path/app.asar")) {
        cp $base_path\app.asar.bak $base_path\app.asar
    } else {
        # create backup of asar file
        # backup + delete asar
        cp $base_path\app.asar $base_path\app.asar.bak
    }

    
    write-host "[+] extracting"
    asar extract $base_path\app.asar $base_path\app\
    rm $base_path\app.asar 2>$null
}


# uid to identify if file has been modified
$uid = '3dc86858-24fd-406f-b534-2544c0e515bf'

$target = "$base_path\app\app.js"
$data = get-content -Path $target -Raw

if (!$data.Contains($uid)) {
    write-host [+] updating
    $newcontent = $data.replace('return null;', "require('$customJS_path') //$uid`n`t`t`t`t`t`treturn null;")
    Set-Content $target -Value $newcontent
}

# copy current inject code to joplin directory
cp ./joplin_inject_code.js $base_path\app\joplin_inject_code.js
write-host [+] done.
write-host [!] Update this js file and restart joplin to update injected code: $base_path\app\joplin_inject_code.js
