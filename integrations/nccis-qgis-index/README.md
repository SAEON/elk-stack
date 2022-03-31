<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [GQIS index integration](#gqis-index-integration)
- [Quick start](#quick-start)
  - [Install Node.js](#install-nodejs)
  - [Setup Elasticsearch](#setup-elasticsearch)
  - [Setup environment](#setup-environment)
  - [Run the script](#run-the-script)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# GQIS index integration

# Quick start
Setup your local computer so you can run/debug/contribute to this code. 

## Install Node.js
This code is tested using Node.js v17.8.0

## Setup Elasticsearch

```sh
# Create a Docker network
docker network create sdp_local_dev

# Create Elasticsearch container
docker run --net=sdp_local_dev --name elasticsearch --memory 1.5g --cpus 1.5 --restart always -e xpack.license.self_generated.type=basic -e xpack.security.enabled=false -e discovery.type=single-node -d -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:7.14.1

# Create Kibana container (optional, and note that the --restart always flag is NOT specified)
docker run --net=sdp_local_dev --name kibana --memory 1024m --cpus 2 -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 -d -p 5601:5601 docker.elastic.co/kibana/kibana:7.14.1
```

## Setup environment

```sh
# Install packages
npm install

# Configure environment variables
cp .env.example .env

# (then update the values in .env)
```

## Run the script

```sh
# Development
npm start

# Production
npm run start:prod
```