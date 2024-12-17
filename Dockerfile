# Use Node.js official image
FROM node:18.20.4

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source files
COPY . .

# Build TypeScript files
RUN yarn build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["node", "dist/app.js"]
