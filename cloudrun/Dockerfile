FROM gplane/pnpm:node20-alpine
#FROM gplane/pnpm:node20-alpine as builder

WORKDIR /app

COPY ./ ./

RUN pnpm install

RUN pnpm run build

CMD ["pnpm", "run", "start"]

#FROM node:20-slim as production
#
#WORKDIR /app
#
#COPY --from=builder /app/.output ./.output
#COPY --from=builder /app/.nuxt ./.nuxt
#ENV HOST=0.0.0.0
#
#ENV PORT=8080
#
#CMD ["node" ,"./.output/server/index.mjs"]
EXPOSE 8080
