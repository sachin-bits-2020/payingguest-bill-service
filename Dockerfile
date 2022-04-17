FROM  node:16.14.2-buster-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "start" ]