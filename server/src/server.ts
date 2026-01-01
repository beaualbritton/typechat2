import type { ServerWebSocket } from "bun";

type ClientSession =
{
  ws: Bun.ServerWebSocket<{username: string}>;
  username: string;
  subs: Set<string>;
};


export class Server
{
  private server!: Bun.Server;
  private clients: Map<ServerWebSocket<{username: string}>, ClientSession> = new Map();

  start(port: number)
  {
    this.server = Bun.serve({
      port,
      websocket: {
        open: this.onOpen.bind(this),
        message: this.onMessage.bind(this),
        close: this.onClose.bind(this),
        publishToSelf: false,
      },
      fetch: (req,server) =>
      {
        const url = new URL(req.url); 
        let username = url.searchParams.get("username") || "guest";
        let room = url.searchParams.get("room") ||'';
        if(server.upgrade(req, {data: {username:username,room:room}}))
        {
          return;
        };
      },
    });
    console.log("Hi! Server running")
  }

  private onOpen(ws: Bun.ServerWebSocket<{username: string, room: string}>)
  {
    let username = ws.data.username;
    let room = ws.data.room;

    const session:ClientSession =
    {
        ws: ws,
        username: username,
        subs: new Set([room])
    }
    this.clients.set(ws, session);

    ws.subscribe(room);

    console.log(`connected: ${ws.remoteAddress} as ${username}`);
    console.log(`connected: ${ws.remoteAddress}`)

    ws.publish(room, `${username} joined room ${room}`);
  }

  private onMessage(ws: Bun.ServerWebSocket<{username: string, room: string}>, message: string)
  {
    const session = this.clients.get(ws);
    if (!session) return;

    let room = ws.data.room;

    console.log(`${session?.username}: ${message}`);

    ws.publish(room, `${session.username}: ${message}`);
  }

  private onClose(ws: Bun.ServerWebSocket<{username: string, room: string}>)
  {
    const session = this.clients.get(ws);
    if (!session) return;

    this.clients.delete(ws)
    let room = ws.data.room;

    ws.publish(room, `${session.username} left the room ${room}`);
    console.log(`${ws.remoteAddress} left.`)
  }
}
