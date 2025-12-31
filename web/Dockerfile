FROM oven/bun:1

WORKDIR /typechat

COPY . .

WORKDIR /typechat/web

RUN bun install

EXPOSE 5173

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
