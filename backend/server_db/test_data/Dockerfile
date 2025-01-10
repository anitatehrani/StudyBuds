FROM node:20.18.0-alpine3.19

WORKDIR /app/backend
COPY ./backend/package.json /app/backend/package.json
RUN npm install
COPY ./backend/tsconfig.json /app/backend/tsconfig.json
COPY ./test/utils /app/test/utils
COPY ./backend/src /app/backend/src
COPY ./backend/server_db/test_data/demo-data.ts /app/backend/server_db/test_data/demo-data.ts
ENTRYPOINT [ "npx","ts-node-transpile-only","server_db/test_data/demo-data" ]
CMD []
