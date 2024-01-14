#!/bin/bash

bash -c "sleep 3 && explorer.exe http://localhost:8080" &
exec docker run --rm -it -v $(pwd):/app -w /app -p 8080:8080 node:alpine yarn start