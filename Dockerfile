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
ARG SERVICE_NAME=trade360-nodejs-sdk
RUN export CODACY_TOKEN=$(aws ssm get-parameter --with-decryption --name /devops/token/codacy | jq -r .Parameter.Value)

# Deps image
# install node packages
RUN npm set progress=false && npm config set depth 0

# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force

# test application
RUN npm run test:cov

ENV CODACY_API_TOKEN=${CODACY_TOKEN}
ENV CODACY_ORGANIZATION_PROVIDER=gh
ENV CODACY_USERNAME=lsportsltd
ENV CODACY_PROJECT_NAME=${SERVICE_NAME}

RUN curl -Ls https://coverage.codacy.com/get.sh -o codacy-coverage-reporter.sh
RUN bash codacy-coverage-reporter.sh report -r coverage.xml

# build nest application
RUN npm run build
