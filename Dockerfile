FROM node:12.16-alpine

ENV NODE_ENV production

RUN apk add --no-cache bash curl

RUN mkdir -p /root/portal

COPY ./dist/portal/app /root/portal/app
COPY ./dist/portal/server /root/portal/server

WORKDIR /root/portal/server

RUN yarn --production

WORKDIR /root/portal

EXPOSE 80

CMD ["node", "./server/cli.js"]
