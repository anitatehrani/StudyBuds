FROM node:18-slim

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --omit=dev --no-package-lock

COPY server.ts tsconfig.json ./
COPY ./src ./src
COPY studybuds-116d5.json ./studybuds-116d5.json
COPY sequelize-auto-options.json ./
COPY server_db/test_data ./server_db/test_data

CMD ["npx","ts-node-transpile-only", "server"]
