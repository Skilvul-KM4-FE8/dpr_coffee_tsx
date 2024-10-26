# Use official Bun image
FROM oven/bun:1 AS base

# Set the working directory inside the container
WORKDIR /app

# Install dependencies only
FROM base AS install

# Copy the package.json and bun.lockb files to cache layer
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy Prisma schema and other necessary files
COPY prisma ./prisma

# Prisma generate command (explicit schema location)
RUN bunx prisma generate --schema=./prisma/schema.prisma

# Copy the rest of the application files
COPY . .

# Build the Next.js application
# RUN bun run build
RUN bun run build --no-lint

# Final production image
FROM base AS production

# Set working directory
WORKDIR /app

# Copy the built app and dependencies from the build stage
COPY --from=install /app/node_modules ./node_modules
COPY --from=install /app/.next ./.next
# COPY --from=install /app/public ./public
COPY --from=install /app/package.json ./package.json

# Expose the default port for Next.js
EXPOSE 3000

# Run the Next.js app in production mode
CMD ["bun", "run", "start"]
