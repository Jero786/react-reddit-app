# react-reddit-app 

Demo Live: https://limitless-reaches-38545.herokuapp.com

## Pre-requisites    
- node: 10.16.x    
- npm: 6.9.x    
- ts-node: v8.6.2
    
## Setup and start the client:
```
cd client && yarn && yarn start
``` 
That will start client on: `http://localhost:3000`    

## Setup and start the server:
```
cd server && yarn && yarn start
``` 
That will start the server on: `http://localhost:5000`    
 
## Run client test:
```
cd client && yarn test
```  
## Run server test:
```
cd server && yarn test
```  

## Deploy to staging    
```  
 cd client && yarn build
 cd ../server
 git add .
 git commit -m "some description about the release"
 git push heroku master
```   
NOTE: In order to deploy the app, you will need a Heroku account. For more information please take a look [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up). And for more information about NodeJS on Heroku, please read [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).
