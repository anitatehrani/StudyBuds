FROM node:20.18.0-alpine3.19

WORKDIR /app
COPY package.json ./package.json
RUN npm install
COPY tsconfig.json ./tsconfig.json
COPY features ./features
COPY utils ./utils
COPY steps ./steps
ENTRYPOINT [ "npx","cucumber-js","--require-module","ts-node/register","--require","steps/*.ts" ]
CMD []
