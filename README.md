# Joplin Customizations
Inject custom code into Joplin + my other customizations

## Patch Joplin
- Features
  - Scroll into View for searches on rendered markdown page
  - Filtering page for all lines with *** and **** 

1) Run patch_Joplin.ps1 
```
git clone https://github.com/alecjmaly/joplin-customization.git
cd joplin-customization
powershell ./patch_Joplin.ps1
```
2) Update 'joplin_inject_code.js' as needed and restart Joplin



## CSS
- Features
  - Flyout Table of Contents on pages with [[toc]]

Copy/paste contents of 'userstyle.css' into Joplin's settings: Appearance > Custom stylesheet for rendered Markdown


## Other options
- Editor font size: 11




