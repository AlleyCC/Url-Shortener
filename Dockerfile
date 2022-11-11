FROM node:14.18.1

WORKDIR /app
ADD app.js package.json ./

RUN npm install
CMD node app.js