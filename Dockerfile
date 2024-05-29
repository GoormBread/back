FROM node:21
CMD ["npm", "run", "start:dev"]

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npx prisma generate
COPY . .

EXPOSE 3000