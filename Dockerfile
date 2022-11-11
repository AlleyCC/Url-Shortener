FROM node:14.18.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .
CMD ["node", "app.js"]

RUN npm install
CMD node app.js