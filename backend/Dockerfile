
FROM node:18

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install dotenv --save-dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
