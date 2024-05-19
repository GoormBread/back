FROM node:21
CMD ["npm", "run", "start:dev"]

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080