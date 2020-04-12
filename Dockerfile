# stage 1 build application dist folder
FROM node:12.15.0 as builder

ARG BUILD_PATH=/opt/city-control/

RUN mkdir -p ${BUILD_PATH}

WORKDIR ${BUILD_PATH}

COPY ./package*.json ${BUILD_PATH}

RUN npm install

COPY ./public ${BUILD_PATH}/public

COPY ./src ${BUILD_PATH}/src

RUN npm run build

RUN mkdir -p /tmp/build

RUN mv ./build /tmp/build

# stage 2 mount build folder on nginx
FROM nginx:1.13

COPY --from=builder /tmp/build/* /usr/share/nginx/html/

COPY ./helm/configs/nginx.conf /etc/nginx/conf.d/default.conf
