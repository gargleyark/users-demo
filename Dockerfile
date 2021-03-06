FROM node:8.9-alpine

WORKDIR /app

COPY package.json .
COPY ./src/ ./src

RUN npm install

EXPOSE 3000

CMD npm start
