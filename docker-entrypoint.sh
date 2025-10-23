#!/bin/bash
set -e

DOMAIN=${DOMAIN:-stalord.in}
EMAIL=${EMAIL:-admin@stalord.in}

# Start Nginx temporarily for Certbot HTTP challenge
nginx -g "daemon off;" &

# Wait for Nginx to start
sleep 5

# Obtain/renew SSL certificate (non-interactive)
certbot certonly --webroot -w /usr/share/nginx/html \
  --agree-tos --no-eff-email --email $EMAIL -d $DOMAIN --non-interactive || true

# Create HTTPS Nginx config
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri /index.html;
    }
}
EOF

# Stop temporary Nginx
nginx -s quit || true

# Start Nginx with HTTPS config
nginx -g "daemon off;"
