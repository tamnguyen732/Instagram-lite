
FROM node:16.13.2-alpine3.15
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["yarn", "dev"]