FROM node:18

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
EXPOSE 3000
COPY . .
RUN npx prisma db push
CMD ["npm", "run", "dev"]