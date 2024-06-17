FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build order-service

CMD ["node", "dist/apps/order-service/main.js"]
