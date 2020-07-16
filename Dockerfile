FROM node as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM  nginx as production-state 
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.crt /etc/ssl/server.crt
COPY server.key /etc/ssl/server.key