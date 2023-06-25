FROM node:14

RUN npm install -g @ionic/cli
WORKDIR /app
COPY ./ /app
RUN npm install
EXPOSE 80
CMD ["ionic", "serve", "--external", "--prod", "--port=80"]
