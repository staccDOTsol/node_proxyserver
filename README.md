# Woo it's proxies served to a nodeserver!

## if you got here from LBRY...

This code is differnt from the code gone over in the video. It's optimized!And runs on a webserver!

## If you didn't come here from LBRY...

You need to get on LBRY There's a video going over the creation of this masterpiece script for anyone to watch for free. Come see me at @real_jare - https://lbry.tv/$/invite/@real_jare:5

## Setup

1. clone repo
2. npm i express mysql mongoose node-cron util --save
3. install mysql
4. create database proxies;
5. use proxies;
6. create table proxies(
   ipAddress VARCHAR(255),
   port VARCHAR(255),
   protocol VARCHAR(255),
   country VARCHAR(255)
);
7. change mysql login info in app.js (in BOTH spots)
8. node app.js
9. wait a min until it inserts to database
10. visit http://localhost:3000
11. 
