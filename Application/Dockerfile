#
#pull official base image
FROM node:14.16.0-alpine

RUN mkdir -p /app
# set working directory
WORKDIR /app

COPY package.json /app
RUN yarn 
# add app
COPY . /app
ENV GENERATE_SOURCEMAP false
RUN NODE_OPTIONS="--max-old-space-size=16128" yarn build

# start app
CMD ["yarn", "start"]
