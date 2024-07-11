# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
