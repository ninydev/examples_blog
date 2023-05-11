FROM node:18-alpine
EXPOSE 5173

WORKDIR /usr/src/app
COPY . .
RUN npm install

# Set up a default command
CMD [ "npm","start" ]
