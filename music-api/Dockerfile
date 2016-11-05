# Create a Docker image with node 6.5.0
FROM node:6.5.0
# Downloads the package lists from the repositories and "updates"
# them to get information on the newest versions of packages and their dependencies
RUN apt-get update -y
# Install pip package manager
RUN apt-get install python-pip -y
# Install rethinkdb python drivers
RUN pip install rethinkdb
# Within the container create the /usr/src/app folders
RUN mkdir -p /usr/src/app
# The WORKDIR instruction sets the working directory for any
# RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile
WORKDIR /usr/src/app
# When building the image copy the package.json file to container's /usr/src/app path
ONBUILD COPY package.json /usr/src/app/
# With our copied package.json run npm install to get all our desired modules
ONBUILD RUN npm install
# Copy our app files into container's /usr/src/app path
ONBUILD COPY . /usr/src/app
# Expose our desired port
EXPOSE 3000
# Default command to run
CMD [ "npm", "start" ]
