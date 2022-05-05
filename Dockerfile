FROM node:16-alpine as builder
RUN apk add --no-cache --virtual .build-deps python3 make g++
COPY package.json package-lock.json tsconfig.json ./
COPY src src
RUN npm ci && npx tsc -p tsconfig.json

FROM node:16-alpine as app
WORKDIR /usr/src/app
RUN apk add git
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./build ./build
EXPOSE 8080
CMD cd /usr/src/app && node build/src/index.js