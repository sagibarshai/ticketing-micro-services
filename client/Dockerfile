FROM node
WORKDIR /usr/app
COPY package.json ./
RUN npm i
COPY ./ ./
CMD ["npm", "start"]