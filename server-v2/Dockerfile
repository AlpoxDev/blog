FROM mhart/alpine-node:14

ENV TZ="Asia/Seoul"
RUN date

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./

# node_modules install
RUN yarn install
RUN yarn global add typescript

COPY . .

ENV NODE_PATH=./dist
RUN yarn build

RUN ls

EXPOSE 8080
CMD ["node", "dist/index.js"]

