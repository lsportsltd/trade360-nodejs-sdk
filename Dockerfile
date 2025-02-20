FROM node:21-alpine as base
WORKDIR /usr/src/app
RUN apk add dumb-init
COPY package*.json ./

FROM base as dependencies
COPY tsconfig*.json ./
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

# Test
FROM dependencies as test
COPY jest.config.ts ./
COPY src src
RUN npm run test:cov

# Codacy
ARG CODACY_TOKEN
ARG SERVICE_NAME
ENV CODACY_API_TOKEN=${CODACY_TOKEN}
ENV CODACY_PROJECT_NAME=${SERVICE_NAME}
ENV CODACY_ORGANIZATION_PROVIDER=gh
ENV CODACY_USERNAME=lsportsltd

RUN wget -qO - https://coverage.codacy.com/get.sh | sh -s -- report -r /usr/src/app/coverage/lcov.info

FROM dependencies as prod_dependencies
RUN npm prune --omit=dev

FROM dependencies as build
COPY src src
RUN npm run build

# Final image
FROM base as production
COPY --from=prod_dependencies /usr/src/app/node_modules node_modules
COPY --from=build /usr/src/app/dist dist

ENV NODE_ENV=production
USER node

ENTRYPOINT [ "dumb-init", "--" ]
CMD ["node", "dist/index.js" ]
