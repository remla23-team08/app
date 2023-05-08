FROM node:16
WORKDIR /usr/src/app

COPY package.json .npmrc ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8083

CMD ["npm", "run", "start"]
