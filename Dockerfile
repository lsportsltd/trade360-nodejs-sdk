# ---- Base Node ----
FROM node:18-alpine AS base
# set working directory
WORKDIR /usr/src/app
# copy project file
COPY package*.json ./
# get and set NPM_TOKEN
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# Deps image
FROM base AS dependencies 
# install node packages
RUN npm set progress=false && npm config set depth 0
# install ALL node_modules, including 'devDependencies'
RUN npm ci && npm cache clean --force

# Builder image
FROM dependencies as builder 
# copy ALL node_modules, including 'devDependencies'
COPY --from=dependencies /usr/src/app/node_modules/ ./node_modules/
# copy all contents
COPY . .
# build nest application
RUN npm run build

# Final image
FROM base as production
# set node_env to production
ENV NODE_ENV=PRODUCTION
# set timezone to UTC
ENV TZ=UTC
# add dumb-init
RUN apk --no-cache --update add dumb-init
# copy all node_modules
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# discard dev dependencies
RUN npm prune --production
# copy build artifact
COPY --from=builder /usr/src/app/dist/ ./dist/
# set user as least priviliged user
USER node

ENTRYPOINT ["dumb-init", "node", "dist/index.js"]
