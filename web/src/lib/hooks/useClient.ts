import { Client } from '../../../../lib/client';
import { useState, useEffect} from 'react';

export function useClient(username: string, connected: boolean)
{
  const [messages, setMessages] = useState<string[]>(['typechat web demo :P']);
  const [client, setClient] = useState<Client>();

  useEffect(() =>
  {
      if(connected && !client)
      {
        let onMessage = (msg: string) => setMessages(prev => [...prev, msg]);
        setClient(new Client(username, 'localhost', 3000, onMessage))
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
