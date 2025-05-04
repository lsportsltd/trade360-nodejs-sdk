# ---- Base Node ----
FROM node:18.20.6

# set working directory
WORKDIR /usr/src/app

# copy project file
COPY . .

# get and set NPM_TOKEN
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# Deps image
# install node packages
RUN npm set progress=false && npm config set depth 0

# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force

## Builder image
FROM dependencies as builder 
# copy ALL node_modules, including 'devDependencies'
COPY --from=dependencies /usr/src/app/node_modules/ ./node_modules/
# copy all contents
COPY . .

# test application
RUN npm run test:cov

ENV CODACY_API_TOKEN=${CODACY_TOKEN}
ENV CODACY_ORGANIZATION_PROVIDER=gh
ENV CODACY_USERNAME=lsportsltd
ENV CODACY_PROJECT_NAME=${SERVICE_NAME}

RUN wget -qO - https://coverage.codacy.com/get.sh | sh -s -- report -r /usr/src/app/coverage/lcov.info
# build nest application
RUN npm run build
