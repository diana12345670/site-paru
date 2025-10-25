FROM node:20-slim AS base

WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs

COPY --from=deps --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=expressjs:nodejs /app/dist ./dist
COPY --from=build --chown=expressjs:nodejs /app/attached_assets ./attached_assets
COPY --chown=expressjs:nodejs package.json ./

USER expressjs

EXPOSE 5000

ENV PORT=5000

CMD ["npm", "start"]
