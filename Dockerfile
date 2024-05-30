FROM node:21


WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npx prisma migrate dev && npx prisma generate && npm run start:dev"]

EXPOSE 3000