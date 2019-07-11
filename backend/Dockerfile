FROM node:11-alpine
WORKDIR /news-app
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3001
CMD ["npm" ,"run" "start:dev"]