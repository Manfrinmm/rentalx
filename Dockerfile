FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

ENV RUNNING_MODE=docker

CMD [ "yarn", "dev" ]
