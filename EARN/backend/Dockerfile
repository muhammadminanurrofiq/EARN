FROM node:18-slim

# Install netcat and openssl for Prisma
RUN apt-get update && apt-get install -y netcat-openbsd openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency definition
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy source code and entrypoint
COPY . .

# Ensure entrypoint is executable
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
