FROM node:fermium-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN yarn  install
COPY . .
RUN yarn build
EXPOSE 2300

CMD ["node", "./bin/www.js"]