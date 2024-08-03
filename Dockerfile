# # Use the official Node.js image as a base
# FROM node:alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and yarn.lock files to the working directory
# COPY package.json yarn.lock ./

# # Install dependencies
# RUN yarn install --production

# # Copy the rest of the application files
# COPY . .

# # Build the NestJS application
# RUN yarn build

# # Expose the application port
# EXPOSE 3000

# # Start the application
# CMD ["node", "dist/main.js"]

FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]
