FROM node:20.18.0-alpine3.19

WORKDIR /app/backend
COPY ./backend/src /app/backend/src
COPY ./backend/package.json /app/backend/package.json
RUN npm install
WORKDIR /app/test
COPY ./test/package.json /app/test/package.json
RUN npm install
COPY ./test/tsconfig.json /app/test/tsconfig.json
COPY ./test/features /app/test/features
COPY ./test/utils /app/test/utils
COPY ./test/steps /app/test/steps
ENTRYPOINT [ "npx","cucumber-js","--require-module","ts-node/register","--require","steps/*.ts" ]
CMD []
