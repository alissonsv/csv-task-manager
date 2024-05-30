# == BUILDER ==
FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# == EXECUTE
FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY --from=builder /usr/src/app/dist/ ./dist/

EXPOSE 3333

CMD [ "npm", "start" ]
