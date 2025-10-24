# Stage 1: Build React app
FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nginx + Certbot for HTTPS
FROM nginx:stable-alpine

# Install Certbot and bash test test
RUN apk add --no-cache bash certbot certbot-nginx openssl curl

# Copy React build
COPY --from=build /app/build /usr/share/nginx/html

# Expose ports 80 and 443
EXPOSE 80 443

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Start Nginx + HTTPS setup
ENTRYPOINT ["/docker-entrypoint.sh"]
