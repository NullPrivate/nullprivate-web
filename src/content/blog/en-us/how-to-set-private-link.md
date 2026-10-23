---
title: "How to Set Up a Dedicated Link"
description: "NullPrivate private service configuration guide: a detailed walkthrough of setting up dedicated links, including Nginx reverse-proxy configuration. Gain full admin-panel access via private services to achieve personalized ad-blocking and privacy protection."
pubDate: "2024-10-29 11:51:06 +0800"
categories: Guide
tags: [Guide, blog]
---

Some paid AdGuard Home services provide a dedicated link but do not allow users to access the admin panel; the provider manages the rules on their behalf.

This indicates that they do not offer a private admin backend; the service is simply delivered through a domain-based reverse proxy, keeping costs relatively low.

You need to rent a server to run AdGuard Home and configure an Nginx reverse proxy to achieve this functionality.

Taking the service link `5r69hxdx9onl70hp.example.com` as an example, the key Nginx configuration is as follows:

```nginx
http {
  server {
    listen 1080;
    server_name 5r69hxdx9onl70hp.example.com;
    location / {
      proxy_pass http://worker.example.com:5002;
      proxy_set_header Host $http_host;
    }
  }
  server {
    listen 1443 ssl;
    server_name 5r69hxdx9onl70hp.example.com;
    ssl_certificate /app/data/certs/5r69hxdx9onl70hp/fullchain.pem;
    ssl_certificate_key /app/data/certs/5r69hxdx9onl70hp/privkey.pem;
    location / {
      proxy_pass https://worker.example.com:5003;
      proxy_set_header Host $http_host;
    }
  }
}
stream {
  ssl_protocols TLSv1.2 TLSv1.3 SSLv3;
  map $ssl_preread_server_name $targetBackend {
    5r69hxdx9onl70hp.example.com worker.internal.com:5004;
  }
  server {
    listen 1853;
    proxy_pass $targetBackend;
    ssl_preread on;
  }
}
```

For each paying user you only need to add one similar Nginx block and point the domain’s DNS to the server. When the number of users grows and load on a single application instance becomes high, you can proxy to different back ends.

Such services cannot achieve true personalization; users must be able to enter the admin panel to truly control their own browsing data. This is the advantage of our private service—each user truly has an exclusive instance and can use all NullPrivate features.
