# ---- Base Node ----
FROM node:18.20.6

# set working directory
WORKDIR /usr/src/app

# copy project file
COPY . .

# get and set NPM_TOKEN
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# codacy args
ARG CODACY_TOKEN
ARG SERVICE_NAME=trade360-nodejs-sdk
# Deps image
# install node packages
RUN npm set progress=false && npm config set depth 0

# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force

# assign build arguments to environment variables
ENV CODACY_API_TOKEN=${CODACY_TOKEN}
ENV CODACY_ORGANIZATION_PROVIDER=gh
ENV CODACY_USERNAME=lsportsltd
ENV CODACY_PROJECT_NAME=${SERVICE_NAME}

# test application
RUN npm run test:cov

# send coverage report to Codacy
RUN apt-get update && apt-get install -y --no-install-recommends bash=5.2.15-2+deb12u1 && rm -rf /var/lib/apt/lists/* && wget -qO - https://coverage.codacy.com/get.sh | bash -s -- report -r coverage/lcov.info
# build nest application
RUN npm run build
