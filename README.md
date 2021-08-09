# Joplin Customizations
Inject custom code into Joplin + my other customizations

<h3 style='color:red;font-weight:bold'>
TESTED ON JOPLIN DESKTOP v. 2.1.9
</h3>

## Patch Joplin
- Features
  - Scroll into View for searches on rendered markdown page
  - Filtering page for all lines with *** and **** 

1) Install node.js dependency
```shell
npm install -g asar
```

1) Run patch_Joplin.ps1 
```
git clone https://github.com/alecjmaly/joplin-customization.git
cd joplin-customization
powershell ./patch_Joplin.ps1
```
2) Update 'joplin_inject_code.js' as needed and restart Joplin





## Other options
**Options > Appearance**
- Editor font size: `12`
- Editor Font Family: `Arial,Helvetica,sans-serif`

### CSS Configs
Copy/paste contents of `userstyle*.css` into Joplin's settings: **Appearance > Advanced Options > Custom stylesheet** for rendered Markdown



