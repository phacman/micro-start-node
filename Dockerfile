FROM node:20.6-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN  npm ci && npm run build

FROM node:20.6-alpine3.18
WORKDIR /app
COPY package*.json ./
COPY public public
RUN npm install --omit=dev
COPY --from=builder /app/dist/ dist/
CMD ["npm", "run", "start"]