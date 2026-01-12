# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY frontend/ .

# Build React app
RUN npm run build

# Production stage (Nginx)
FROM nginx:alpine

# Copy build output to Nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
