FROM postgres:latest

RUN mkdir /seed/
COPY Data/*.csv /seed/

RUN chmod a+rx /seed

COPY App/Database/setup/schema.sql /docker-entrypoint-initdb.d