#!/bin/bash
npm install
killall -9 node
nohup npm run start >/dev/null 2>&1 &