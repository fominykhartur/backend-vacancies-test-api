FROM node:16.10.0-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .

CMD ["npm", "run", "start:dev"]