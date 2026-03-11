# Build stage - compile frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build frontend
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm ci --production

COPY server/index.js ./

# Copy built frontend to public folder
COPY --from=builder /app/dist ./public

EXPOSE 3000

CMD ["node", "index.js"]
