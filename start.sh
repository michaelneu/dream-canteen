#!/bin/bash

exec docker run --rm -it -v $(pwd):/app -w /app -p 8080:8080 node:alpine yarn start