FROM node:12.15.0-alpine3.11

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install && yarn cache clean

COPY . .

CMD [ "yarn", "start:debug" ]
