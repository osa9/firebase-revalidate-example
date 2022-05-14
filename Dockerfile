FROM node:18.1.0

WORKDIR /app

COPY . .
RUN yarn install && yarn build

CMD yarn start --port $PORT