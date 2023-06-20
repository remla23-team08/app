FROM node:20
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
  openssl \
  vim \ 
  curl \
  lsof \
  iputils-ping

LABEL authors="Team 08 REMLA" \
  description="Application Frontend"

COPY package.json .npmrc ./

RUN --mount=type=secret,id=NPM_TOKEN \
  NPM_TOKEN=$(cat /run/secrets/NPM_TOKEN) \
  npm install

COPY . .
RUN npm run build

EXPOSE 8083

CMD ["npm", "run", "start"]
