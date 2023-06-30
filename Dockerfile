FROM node:16
RUN npm install -g @ionic/cli
WORKDIR /app
COPY ./ /app
RUN npm install
RUN ionic build --prod
FROM nginx
COPY --from=0 /app/www/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]