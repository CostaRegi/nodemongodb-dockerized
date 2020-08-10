# How to Run
This application can run as a docker container so you do not have to install anything besides node locally. 

In order to run this application you will have to have docker installed: 
if you do not have docker installed please check the links bellow to install it:

- [Docker Desktop for Mac](https://download.docker.com/mac/stable/Docker.dmg)
- [Docker Desktop for Windows](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)

and Sign-up for a docker ID [link Docker Hub](https://hub.docker.com/)

After finishing the installation you only need to start your containers and you should be good to use the api. To start the api and the database do 

```
docker-compose up -d
```

To stop the containers do

```
docker-compose down
```

Check the [Api Documentation](http://localhost:8080/api-docs/new-beginnings/#/) to validate the exposed endpoints

# Architecture

This a node express application with mongo db as the persistance layer. It's intent is to expose a microservice that will allow to add participants to a clinical study called new beginnings.



