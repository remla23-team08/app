FROM node:20
WORKDIR /usr/src/app

COPY package.json .npmrc ./

RUN --mount=type=secret,id=NPM_TOKEN \
  NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) \
  npm install

COPY . .
RUN npm run build

EXPOSE 8083

CMD ["npm", "run", "start"]
