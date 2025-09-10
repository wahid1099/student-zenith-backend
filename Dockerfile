FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ./src ./src

# Compile TypeScript to JavaScript
RUN npm run build


# -----------------------
# Stage 2: Production
# -----------------------
FROM node:18 AS production

WORKDIR /app

# Copy only required files
COPY package*.json ./

RUN npm install --only=production

# Copy compiled JS from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "dist/server.js"]