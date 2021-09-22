# ReviewsAPI

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## About

System Design Capstone for Hackreactor. This is the reviews API for an eCommerce website that was divided into a service based architecture. The API, server, and database were designed to interface with an inherited front-end. After creating and optimizing the backend, it was load tested locally, dockerized, deployed on ec2 instances, and finally load tested again. To increase the throughput, the system was horizontally scaled by adding more servers with an nginx load balancer. 

## Requirements

[Docker](https://docs.docker.com/get-docker/) necessary for running the multiple containers the app is divided into.  
[Docker Compose](https://docs.docker.com/compose/install/) necessary for creating the docker images if running locally.

## Local Installation/Setup with Docker
1. Clone the `local` branch of this repository or download its zip.
2. navigate inside the directory using the console
3. Download [`reviews.csv`](https://drive.google.com/file/d/1OCtJD8WhWS5MxVhBvsJAiG4GiWDdMGF3/view?usp=sharing) [`reviews_photos.csv`](https://drive.google.com/file/d/1VrOfjBWPCWrQ76CFZrEqenu4VMTwsjwk/view?usp=sharing) [`characteristics.csv`](https://drive.google.com/file/d/1Vw_ea1Y53igFBd2JXjU3PEkLp_byNff1/view?usp=sharing) [`characteristic_reviews.csv`](https://drive.google.com/file/d/1Rm2RaSuNth38440QlowBYN-69yAfq5rk/view?usp=sharing) data to the `Data` Folder
4. Compose docker images using `docker-compose build`
5. Spin up containers from the images using `docker-compose up -d` (The postgres container will take a long time to seed the data)  
&nbsp;&nbsp;&nbsp;&nbsp; - the `-d` tag detaches the logs so the containers are running in the background  
&nbsp;&nbsp;&nbsp;&nbsp; - to view the individual logs use `docker logs sdc-<ContainerName> -f` (the `-f` Follows the logs and is only necessary if the user is &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; interested in the continuous output 
7. The docker containers are now live, the node servers are available on `localhost:3000` and `localhost:3001`. The nginx load balancer is available on `localhost:3005` and the postgres container is on `localhost:3006`

## Usage

If you'd like to make changes to the code, clone the `local` branch, when a change is made rebuild the image where the change occured using `docker-compose build <ContainerName>`, then re-spin up the container using `docker-compose up <ContainerName>`.

Using k6 the system can be load tested locally by running `k6 App/Server/tests/k6Scripts.js`

## Results

