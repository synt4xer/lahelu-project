FROM node:18.20.5-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY src ./src
COPY migrations ./migrations

RUN yarn build


FROM node:18.20.5-alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/uploads

COPY package.json yarn.lock tsconfig.json ./

ENV NODE_ENV production
RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/app.js"]