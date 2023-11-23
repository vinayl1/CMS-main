# Dockerfile for React client

# Build react client
FROM node:alpine

# Working directory be app
WORKDIR /frontend

COPY package.json .

###  Installing dependencies

RUN npm install --force

# copy local files to app folder
COPY . .

EXPOSE 5173 

CMD ["npm", "run", "dev"]