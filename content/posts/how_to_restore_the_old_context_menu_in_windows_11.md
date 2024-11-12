+++
date = '2024-11-12T20:11:26+05:00'
draft = false
title = 'How to restore the old context menu in windows 11'


tags = ["configurations", "windows"]
categories = ["Tutorials"]

[cover]
image = "/assets/images/windows_old_context_menu.png"
alt = "The old context menu"
relative = false
+++

# Introduction

You can restore the old Windows 10 context menu if you are not happy with the new one in Windows 11. This may be due to the appearance of the new menu or its usability. Follow the steps below to easily restore the older menu.

{{< embedImage src="/assets/images/windows_new_context_menu.png" alt="The new context menu" title="The new context menu" maxWidth="25vw" maxHeight="50" position="center">}}



# Enable the old context menu

```bash {linenos=inline}
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```



# Revert back to the new context menu

```bash {linenos=inline}
reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```

\
[**Learn more**](https://answers.microsoft.com/en-us/windows/forum/all/restore-old-right-click-context-menu-in-windows-11/a62e797c-eaf3-411b-aeec-e460e6e5a82a)