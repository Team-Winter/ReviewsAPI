sudo yum update -y
sudo yum install git -y
sudo yum install docker -y

git clone https://github.com/Team-Winter/ReviewsAPI.git

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version


sudo service docker start

sudo usermod -a -G docker ec2-user
# curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -