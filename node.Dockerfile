FROM node:10

WORKDIR /src

COPY App /src

RUN npm install

EXPOSE 3000

CMD npm start