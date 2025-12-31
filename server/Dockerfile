FROM oven/bun:1

WORKDIR /typechat

COPY . .

WORKDIR /typechat/server

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
