##: --------------------------------------------------------
##: veriKami (2024)
##: --------------------------------------------------------
FROM node:18-alpine

RUN apk add --no-cache bash rsync
RUN apk add --no-cache tini

ENTRYPOINT ["tini", "--"]

##: --------------------------------------------------------
##: BASH (aliases)
##: ---------------------
RUN printf "#: aliases\n\
alias l='ls -l'\n\
alias ll='ls -lA'\n\
alias lr='ls -lAR'\n\
alias px='ps aux'\n\
alias qq='exit'\n\
" > /root/.bashrc

##: --------------------------------------------------------
##: DEVELOPMENT
##: --------------------------------------------------------
WORKDIR /app

ENV NODE_ENV="development"
ENV PORT="8000"

COPY package*.json ./
RUN npm install

COPY . ./

##: ---------------------
##: RUN npm run build
##: RUN npm test

EXPOSE 8000

##: CMD ["node", "build/server.js"]
CMD ["./node_modules/.bin/ts-node", "src/server.ts"]
##: --------------------------------------------------------
##: EOF
