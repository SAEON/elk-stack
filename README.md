# elasticsearch
SAEON's Elasticsearch servers

## Server setup

- [Install Docker Engine](https://docs.docker.com/engine/install/centos/)
- [Init Docker Swarm mode](https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/) (using a single node - Swarm mode allows setting service usage limits on CPU and memory)

## Setup a limited permissions user called 'runner'

```sh
adduser runner
passwd runner # Setup a strong password
su runner
```

The `runner` user needs to be able to run `docker`, but should not be in the `docker` group

```sh
visudo

# Add this line to the bottom of the visudo file
runner ALL=NOPASSWD: /opt/deploy-docker-stack.sh
```

Create the deploy script

```sh
echo "docker stack deploy -c \$1 \$2" > /opt/deploy-docker-stack.sh
chown root /opt/deploy-docker-stack.sh 
chmod 755 /opt/deploy-docker-stack.sh
```

## Server administration
Add the following to the root crontab
```
0 0 * * 0 docker system prune -f > /opt/docker-system-clean.log 2>&1
```

## Install Nginx

```sh
sudo yum install epel-release
sudo yum install nginx
sudo systemctl start nginx
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```

## Deploy
Push to relevant branch to trigger server deployment

## TODO
Add nginx blocks automatically