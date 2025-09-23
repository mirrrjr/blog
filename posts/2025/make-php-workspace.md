---
date: 2025-08-19
title: Make PHP Workspace
category: backend
tags:
    - php
    - mysql
    - postgresql
    - nginx
    - laravel
    - composer
description: Create a PHP workspace with MySQL, PostgreSQL, Nginx, and Laravel using Docker.
---

# Make PHP Workspace

> I use Debian 13 Trixie, but my configs will also work on Debian-based Ubuntu, Linux Mint, and other Linux distros (with slight differences).

## 1. First, we will install the latest version of PHP available at this time.

### Add ondrej/php DPA

Because PHP 8.4 packages are not available in any of the current Debian or Ubuntu software repositories, the PHP packages must come from another repo.

Ondřej Surý maintains a package archive that contains compiled binaries of all current PHP versions, for Ubuntu and Debian. It also ships several PECL extensions including PECL extensions for PHP core extensions unbundled in PHP 8.4.

Once this repository is added, the initial installation and updates can be done with the standard apt commands.

```bash
# for debian

sudo apt-get update
sudo apt-get -y install lsb-release ca-certificates curl apt-transport-https
sudo curl -sSLo /tmp/debsuryorg-archive-keyring.deb https://packages.sury.org/debsuryorg-archive-keyring.deb
sudo dpkg -i /tmp/debsuryorg-archive-keyring.deb
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
sudo apt-get update

# for ubuntu

sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php # Press enter to confirm.
sudo apt update
```

### PHP CLI and PHP-FPM (recommended)

It is recommended to install PHP-FPM to integrate PHP with web-servers such as Apache, Nginx, and Caddy.

```bash
sudo apt install php8.4-cli php8.4-fpm
```

### Install PHP Extensions

```bash
sudo apt install php8.4-common php8.4-{bcmath,bz2,curl,gd,gmp,intl,mbstring,opcache,readline,xml,zip,mysql,pgsql,redis,imagick,memcached,soap,xmlrpc,exif,ftp,ldap,sodium}
```

## 2. Install Nginx

```bash
sudo apt install nginx nginx-extras
```

## 3. Install MySQL (users using distros other than debian, type "mysql-server" instead of "mariadb-server")

```bash
# for debian
sudo apt install mariadb-server

# for ubuntu
sudo apt install mysql-server
```

### Create a custom user as desired.

```bash
sudo mysql -u root -p
```

```sql
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'strong_password';

CREATE DATABASE myapp_db;

GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';

FLUSH PRIVILEGES;

exit
```

To connect:

```bash
mysql -u myapp_user -p myapp_db
```

## 4. Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib
```

### Create a custom user as desired.

```bash
sudo -u postgres psql
```

```sql
CREATE USER myapp_user WITH PASSWORD 'strong_password';

CREATE DATABASE myapp_db WITH OWNER myapp_user;

GRANT ALL PRIVILEGES ON DATABASE myapp_db TO myapp_user;

\q
```

To connect:

```bash
psql -U myapp_user -d myapp_db
```

## 5. Install Composer

```bash
sudo apt install composer
```

## 6. Install Laravel

```bash
composer global require laravel/installer
```

## 7. Install phpMyAdmin (optional)

```bash
sudo apt install phpmyadmin
```

### Configure Nginx to use phpMyAdmin

```bash
sudo nano /etc/nginx/sites-available/default
```

Add the following location block inside the `server` block:

```nginx
location /phpmyadmin {
		alias /usr/share/phpmyadmin/;
		index index.php index.html index.htm;

		location ~ ^/phpmyadmin/(.+\.php)$ {
			alias /usr/share/phpmyadmin/$1;
			fastcgi_pass unix:/run/php/php8.4-fpm.sock;
			fastcgi_index index.php;
			fastcgi_param SCRIPT_FILENAME /usr/share/phpmyadmin/$1;
			include fastcgi_params;
		}

		location ~* ^/phpmyadmin/(.+\.(jpg|jpeg|gif|css|png|js|ico|html|xml|txt))$ {
			alias /usr/share/phpmyadmin/$1;
		}
}
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```
