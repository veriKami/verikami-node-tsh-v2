##: --------------------------------------------------------
##: veriKami (2024)
##: --------------------------------------------------------
FROM node:18-alpine as build

RUN apk add --no-cache bash rsync

##: --------------------------------------------------------
WORKDIR /app

ENV NODE_ENV development

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

##: remove dev packages
RUN npm prune --omit=dev

##: --------------------------------------------------------
##: PRODUCTION
##: --------------------------------------------------------
FROM node:18-alpine

RUN apk add --no-cache tini

ENTRYPOINT ["tini", "--"]

##: --------------------------------------------------------
WORKDIR /app

ENV NODE_ENV production

COPY --from=build --chown=node:node /app/data/orig.db.json ./data/db.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/views ./views
COPY --from=build --chown=node:node /app/build ./build

##: --------------------------------------------------------
USER node

EXPOSE 8000

CMD ["node", "build/server.js"]
##: --------------------------------------------------------
##: EOF
