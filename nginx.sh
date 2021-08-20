sudo apt-get password
# moight need password here

sudo apt-get install nginx

#enable firewall
sudo ufw enable

#confirm installiion
nginx --version
# nginx -v

# list application configuration know to firewall
sudo ufw app list

# Nginx full opens bnoth 80 and 443 unencrypted http and encrypted https
sudo ufw allow "Nginx full"

# Nginx HTTP opens port 80
# sudo ufw allow "Nginx HTTP"

# Nginx HTTPS opens port 443
# sudo ufw allow "Ngin HTTPS"

# check application is working
sudo ufw status

# or

sudo systemctl status nginx

# go to app
# so far installed...
# curl
# openSSH
# vim

# copy files into ... directory
sudo cp -r FILEPATH . /var/www
# all(" . ") to /var/www


