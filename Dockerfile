FROM node:10.16.3

RUN npm install -g npm@latest

WORKDIR /app

CMD [ "npm", "run", "dev" ]
