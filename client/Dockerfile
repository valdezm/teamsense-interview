
ARG NODE_VERSION=18.16.0

FROM node:$NODE_VERSION-slim as teamsense-frontend

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /react-ui && mv ./node_modules ./react-ui

WORKDIR /react-ui

COPY . .

# Build the project and copy the files
CMD [ "npm", "run", "dev" ]

EXPOSE 5173