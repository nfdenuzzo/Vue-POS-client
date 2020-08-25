FROM node:14-alpine

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD npm run dev:serve

#Node Application Port
EXPOSE 4001