# Dockerfile for React client

# Build react client
FROM node:alpine

# Working directory be app
WORKDIR /backend

COPY package*.json /backend/

###  Installing dependencies

RUN npm install --force

# copy local files to app folder
COPY . .

EXPOSE 3333

CMD ["npm","start"]