#!/usr/bin/env bash
set -euo pipefail

docker build -f ./Dockerfile -t elliotjreed/ninthyard-nginx:latest .
docker push elliotjreed/ninthyard-nginx:latest
