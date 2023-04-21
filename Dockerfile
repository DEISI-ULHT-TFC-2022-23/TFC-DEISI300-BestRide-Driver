FROM node:18-alpine

RUN npm install -g @ionic/cli
WORKDIR /app
COPY ./ /app
RUN npm install
EXPOSE 80
CMD ["ionic", "serve", "--external", "--prod", "--port=80"]
