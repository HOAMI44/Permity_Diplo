# FROM node:lts-alpine as BUILD_IMAGE
FROM arm32v6/node:lts-alpine3.12 as BUILD_IMAGE

WORKDIR /app

COPY package.json package-lock.json ./

# install dependencies
RUN npm install

COPY . .

# build
RUN npm run build

# remove dev dependencies
RUN npm prune --production

# # FROM node:lts-alpine
# FROM arm32v6/node:lts-alpine3.12

# WORKDIR /app

# # copy from build image
# COPY --from=BUILD_IMAGE /app/package.json ./package.json
# COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
# COPY --from=BUILD_IMAGE /app/.next ./.next
# COPY --from=BUILD_IMAGE /app/public ./public
# # #COPY --from=BUILD_IMAGE /app/.env.local ./

EXPOSE 3000
CMD npm start