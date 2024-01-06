#FROM node:20-slim
FROM ghcr.io/puppeteer/puppeteer:21.3.6

WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm clean-install

COPY index.js /usr/src/app

CMD [ "node", "index.js" ]
