import { Client } from '../client/';
import { useState, useEffect} from 'react';

export function useClient(username: string, room:string, connected: boolean)
{
  const [messages, setMessages] = useState<string[]>(['typechat web demo :P']);
  const [client, setClient] = useState<Client>();

  useEffect(() =>
  {
      if(connected && !client)
      {
        let onMessage = (msg: string) => setMessages(prev => [...prev, msg]);
        setClient(new Client(username, room, 'localhost', 3000, onMessage))
      }

  },[connected, username, client]);

  const sendMessage = (msg: string) =>
  {
    if (msg === "exit") 
    {
      client?.exit();
    }
    client?.sendMessage(msg);

    setMessages([...messages, msg]);
  }

  return {messages, sendMessage}

}
