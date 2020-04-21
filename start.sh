#!/bin/bash

echo "Starting Golden Retriever handler"
npm run handler &

echo "Starting API gateway"
npm run api
