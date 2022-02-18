# pull official base image
FROM node:14.16.0-alpine

# set working directory
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn 
# add app
COPY . ./
RUN yarn build

# start app
CMD ["yarn", "start"]
