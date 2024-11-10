FROM node:22 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
COPY package.json pnpm-lock.yaml dist/

FROM base
COPY --from=builder /app/dist  /app
WORKDIR /app
ENV NODE_ENV=production
RUN pnpm install
EXPOSE 3000
CMD ["node", "index.js"]
