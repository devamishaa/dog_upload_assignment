# Use Node.js 18 as the base image
FROM node:alpine

# Create app directory in container
WORKDIR /app
RUN cd /app
# Copy rest of the application code
COPY . .
# Install dependencies
RUN npm install



# Expose the port your app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]