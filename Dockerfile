FROM ubuntu:14.04
MAINTAINER faikabth <faika.bth@gmail.com>

RUN apt-get update -y
#Installation packages nécessaires
RUN apt-get install curl vim -y --force-yes
RUN apt-get install npm -y --force-yes
RUN curl -sL https://deb.nodesource.com/setup_4.x |sh
RUN apt-get install -y nodejs --force-yes
RUN apt-get install -y build-essential --force-yes
#Copie des fichiers necessaires et installation des dependances pour execution de l application  nodejs
COPY package.json .
RUN npm install
COPY . ./

#Creations dossiers nécessaires pour configurations et templates de confd
RUN mkdir -p /opt/confd/bin /etc/confd/templates  /etc/confd/conf.d
#Installation de confd
RUN curl -sLk https://github.com/kelseyhightower/confd/releases/download/v0.9.0/confd-0.9.0-linux-amd64 > /opt/confd/bin/confd
#Creation des liens pour execution confd
RUN  ln -s /opt/confd/bin/confd /bin/confd
RUN chmod +x /opt/confd/bin/confd

#installation nginx
RUN apt-get install -y nginx --force-yes
#Suppression du fichier de configuration de nginx que confd va créer
RUN rm -v /etc/nginx/sites-enabled/default

#Creation template pour fichier de configuration pour nginx a partir de confd
RUN echo "[template]" > /etc/confd/conf.d/default.toml
RUN echo "src=\"default.tmpl\"" >> /etc/confd/conf.d/default.toml
RUN echo "dest=\"/etc/nginx/sites-enabled/default\"" >> /etc/confd/conf.d/default.toml
RUN echo "keys=[\n\"/portkhalil\"\n]" >> /etc/confd/conf.d/default.toml

RUN echo "server {" > /etc/confd/templates/default.tmpl
RUN echo " listen 80;" >> /etc/confd/templates/default.tmpl
RUN echo "location / {" >> /etc/confd/templates/default.tmpl
RUN echo "proxy_pass http://localhost:{{getv \"/portkhalil\"}};" >> /etc/confd/templates/default.tmpl
RUN echo "proxy_http_version 1.1;" >> /etc/confd/templates/default.tmpl
RUN echo "proxy_set_header Upgrade \$http_upgrade;" >> /etc/confd/templates/default.tmpl
RUN echo "proxy_set_header Connection 'upgrade';" >> /etc/confd/templates/default.tmpl
RUN echo "proxy_set_header Host \$host;" >> /etc/confd/templates/default.tmpl
RUN echo "proxy_cache_bypass \$http_upgrade;" >> /etc/confd/templates/default.tmpl
RUN echo "}\n}" >> /etc/confd/templates/default.tmpl

#confd: création du template pour le script d'initialisation 
RUN echo "[template] " > /etc/confd/conf.d/script.sh.toml
RUN echo "src  =\"script.sh.tmpl\"" >> /etc/confd/conf.d/script.sh.toml
RUN echo "dest = \"/tmp/script.sh\"" >> /etc/confd/conf.d/script.sh.toml
RUN echo "keys = [ \n \"/portachref\" \n ]" >> /etc/confd/conf.d/script.sh.toml

RUN echo  "#!/bin/bash"  > /etc/confd/templates/script.sh.tmpl
RUN echo "node server.js > /dev/null  & "  >> /etc/confd/templates/script.sh.tmpl
RUN echo "service nginx restart "  >> /etc/confd/templates/script.sh.tmpl
RUN echo "while true; do sleep 1000; done " >> /etc/confd/templates/script.sh.tmpl

EXPOSE 80 82
ENTRYPOINT confd -backend consul -node 192.168.210.133:8500 -onetime && sleep 2 && chmod +x /tmp/script.sh && /tmp/script.sh 

