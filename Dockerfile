# Build stage - compile frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .

# Build-time args for Vite (VITE_ vars are baked into the bundle at build time)
ARG VITE_WEB3FORMS_KEY
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

RUN npm run build

# Production stage - nginx to serve static files
FROM nginx:alpine

# Copy built files to nginx's default serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config for client-side routing (React Router support)
RUN echo 'server { \
  listen 8080; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
