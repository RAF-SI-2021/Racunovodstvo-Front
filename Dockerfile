FROM node:14.19.0 as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
ARG configuration
RUN npm run build -- --configuration=$configuration

FROM nginx:latest as prod

LABEL org.opencontainers.image.source https://github.com/RAF-SI-2021/Racunovodstvo-Front

COPY --from=build /usr/local/app/dist/racunovodstvo /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
