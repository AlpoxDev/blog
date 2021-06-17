FROM node:14

ENV TZ="Asia/Seoul"
RUN date

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
# for using tsc build
RUN npm install typescript

COPY . .

ENV NODE_PATH=./dist
RUN npm run build

RUN ls

CMD ["node", "dist/index.js"]

