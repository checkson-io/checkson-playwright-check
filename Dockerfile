FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm clean-install

COPY index.js /usr/src/app

CMD [ "node", "index.js" ]
