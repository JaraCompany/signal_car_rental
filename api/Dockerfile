FROM node:18-alpine3.18

# Installing libvips-dev for sharp Compatibility and MySQL client
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git \
    mysql-client

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/

# Copying package files
COPY package.json yarn.lock ./

# Installing global packages and project dependencies
RUN yarn global add node-gyp && \
    yarn config set network-timeout 600000 -g && \
    yarn install

# Adding node_modules to PATH
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app

# Copying app files
COPY . .

# Changing ownership to non-root 'node' user
RUN chown -R node:node /opt/app

# Switching to 'node' user
USER node

# Building the app
RUN yarn build

# Exposing the port Strapi runs on
EXPOSE 1337

# Command to run the app
CMD ["yarn", "develop"]
