FROM node:20-slim

WORKDIR /app

COPY .output .output
COPY .env .env
COPY package.json package.json

CMD ["npm", "run", "start"]
EXPOSE 8080
