<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [elasticsearch](#elasticsearch)
  - [Server setup](#server-setup)
  - [Setup a limited permissions user called 'runner'](#setup-a-limited-permissions-user-called-runner)
  - [Server administration](#server-administration)
  - [Install Nginx](#install-nginx)
  - [Deploy](#deploy)
  - [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# elasticsearch
SAEON's Elasticsearch servers

## Server setup

- [Install Docker Engine](https://docs.docker.com/engine/install/centos/)
- [Init Docker Swarm mode](https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/) (using a single node - Swarm mode allows setting service usage limits on CPU and memory)

## Setup a limited permissions user called 'runner'
The runners hosted on github-runner.saeon.int use this login

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
Github actions are all run via `workflow_dispatch` triggers

## TODO
Add nginx blocks automatically
