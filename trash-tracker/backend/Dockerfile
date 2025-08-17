# Use official Node.js LTS image
FROM node:18

# Install python
RUN apt-get update \
  && apt-get install -y python3 python3-pip \
  && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package.json first
COPY package*.json ./
RUN npm install --production

# Copy the entire project
COPY . .

# install python deps
RUN pip3 install --break-system-packages -r python/requirements.txt

EXPOSE 3000
CMD ["npm", "start"]
