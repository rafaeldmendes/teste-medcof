# Use the official Node.js image as the base image
FROM node:21
# If you're using M1, M2 Mac, try this: 
# FROM  --platform=linux/amd64 node:16.14.0-alpine

# Set the working directory
WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install

COPY . .


# Expose the port
EXPOSE 3000


# Start the application
CMD [ "node", "index.js","--env-file=.env" ]