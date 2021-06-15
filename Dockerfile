FROM node:12-alpine as build

# Create app directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --silent
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Production environment
FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx"]
