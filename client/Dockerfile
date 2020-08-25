FROM node:12

WORKDIR /app

COPY package.json /app
RUN npm install -g @quasar/cli && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init \
    npm rebuild node-sass
COPY . /app

CMD quasar dev -m pwa

#Node Application Port
EXPOSE 8080