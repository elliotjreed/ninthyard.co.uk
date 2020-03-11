#!/usr/bin/env bash
set -euo pipefail

docker build -f ./php/Dockerfile -t elliotjreed/ninthyard-php:latest .
docker build -f ./nginx/Dockerfile -t elliotjreed/ninthyard-api-nginx:latest .

docker push elliotjreed/ninthyard-php:latest
docker push elliotjreed/ninthyard-api-nginx:latest
