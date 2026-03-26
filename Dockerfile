FROM node:lts-alpine3.23 AS build
WORKDIR /app
COPY . .
ENV TZ="America/Sao_Paulo"
#ENV VITE_API_ENDPOINT="https://api.travacarrinho.com.br/api/"
#ENV VITE_REPORT_API_ENDPOINT="https://botreportapi.manja.tec.br/api/"
RUN npm i
RUN npm run build

# production environment
FROM nginx:stable-alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
