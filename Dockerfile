####################
# PRODUCTION IMAGE #
####################
FROM node:16-alpine

WORKDIR /app

COPY . .
RUN npm install --only=production

EXPOSE 80

CMD ["node", "app.js"]
