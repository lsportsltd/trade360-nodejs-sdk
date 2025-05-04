# ---- Base Node ----
FROM node:18.20.6

# set working directory
WORKDIR /usr/src/app

# copy project file
COPY . .

# get and set NPM_TOKEN
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}
# get and set arguments
ARG SERVICE_NAME
ARG CODACY_TOKEN
ARG NPM_TOKEN
ARG TOKEN

# assign build arguments to environment variables
ENV CODACY_API_TOKEN=${CODACY_TOKEN}
ENV CODACY_ORGANIZATION_PROVIDER=gh
ENV CODACY_USERNAME=lsportsltd
ENV CODACY_PROJECT_NAME=${SERVICE_NAME}

# Deps image
# install node packages
RUN npm set progress=false && npm config set depth 0

# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force

# build nest application
RUN npm run build

# run unit tests and create coverage report
RUN npm run test:cov #NodeJS (define the coverage command in package.json)

# send coverage report to Codacy
RUN wget -qO - https://coverage.codacy.com/get.sh | sh -s -- report -r coverage/lcov.info