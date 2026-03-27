#!/bin/bash

cd /apps/condo-kitnet/hospede-frontend

git checkout main

git pull

docker compose down --remove-orphans
docker compose up -d --build
