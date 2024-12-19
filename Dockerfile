# stage 1: build the app
FROM node:18.20.5-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY src ./src
COPY migrations ./migrations

RUN yarn build

# stage 2: run the app with production environment, reduce the size of the image
FROM node:18.20.5-alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/uploads

# Install ffmpeg for video compression
RUN apk add --no-cache ffmpeg

COPY package.json yarn.lock tsconfig.json ./

ENV NODE_ENV production
RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/migrations ./migrations

EXPOSE 5000

CMD ["node", "dist/app.js"]