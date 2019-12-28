#!/bin/bash
npm install --registry=https://registry.npm.taobao.org
killall -9 node
nohup npm run start >/dev/null 2>&1 &
exit