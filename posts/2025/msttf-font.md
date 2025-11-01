---
date: 2025-11-01
title: Install Microsoft Fonts (including Times New Roman) on Linux
category: tech
tags:
    - fonts
    - ms-fonts
description: Easy installation of Times New Roman font on Debian-based Linux distros
---

1. Download TTF font file - [link](https://www.cufonfonts.com/font/times-new-roman)

2. Create a directory at the current user’s home (if missing):

```bash
$ mkdir ~/.fonts
```

3. Copy the font file:

```bash
$ cp ~/Downloads/times.ttf ~/.fonts
```

4. Update the font cache in Linux:

```bash
$ sudo fc-cache -f -v
```
