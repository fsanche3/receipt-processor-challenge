FROM node:18

# Setworking directory
WORKDIR /usr/src/app

# Copy the application code to the container
COPY . .

# Install the app dependencies
RUN npm install

# Compile TypeScript files to JavaScript
RUN npm run build

# Run automated jest unit test
RUN npm test

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/src/server.js"]