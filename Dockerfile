FROM node:21
CMD ["npm", "run", "start:dev"]

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma db pull
RUN npx prisma generate


EXPOSE 3000