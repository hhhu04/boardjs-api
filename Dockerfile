FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM nginx:alpine

RUN apk add --no-cache nodejs npm

COPY --from=builder /app /app

COPY nginx.conf /etc/nginx/nginx.conf

ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
ARG JWT_SECRET
ARG CYPHERS
ARG DNF
ARG LOL

ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV JWT_SECRET=${JWT_SECRET}
ENV CYPHERS=${CYPHERS}
ENV DNF=${DNF}
ENV LOL=${LOL}

WORKDIR /app

EXPOSE 80

CMD sh -c "npm start & nginx -g 'daemon off;'"