FROM node:14.19.0 as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest as prod

COPY --from=build /usr/local/app/dist/racunovodstvo /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
