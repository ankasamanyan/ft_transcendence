FROM node:18-alpine3.16
WORKDIR  /frontend
COPY package*.json ./
COPY . .
RUN npm install --no-audit
RUN npm install
RUN npm ci

EXPOSE 4200
CMD ["npm", "start"]
