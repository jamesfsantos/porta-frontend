#!/bin/bash

cd /apps/condo-kitnet/hospede-frontend

git checkout feature/portas-kitnet

git pull

docker compose down --remove-orphans
docker compose up -d --build
