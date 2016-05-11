FROM ubuntu:14.04
MAINTAINER faikabth <faika.bth@gmail.com>

RUN apt-get update -y
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update -y
RUN apt-get install mongodb-org -y --force-yes

RUN mkdir -p /data/db
RUN locale-gen
RUN export LC_ALL=C
RUN  service mongod start
EXPOSE 27017

RUN apt-get install curl -y
RUN apt-get install npm -y
RUN curl -sL https://deb.nodesource.com/setup_4.x |sh
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential


WORKDIR . 
#COPY package.json ./
#RUN npm install
RUN npm install mongodb
COPY . .
COPY myStartupScript.sh /usr/local/myscripts/myStartupScript.sh
EXPOSE 3000
CMD ["/bin/bash", "/usr/local/myscripts/myStartupScript.sh"]

