FROM node:18-alpine

# Install openssl for Prisma client and netcat (nc) for health checking
RUN apk add --no-cache openssl libc6-compat

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
