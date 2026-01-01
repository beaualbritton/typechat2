#!/usr/bin/env bun
import { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import {Client} from "../../lib/client/"

const App = () => 
{
  const [messages, setMessages] = useState<string[]>(['typechat cli demo with ink :P']);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [connected, setConnection] = useState(false);
  const [client, setClient] = useState<Client>();

  useEffect(() =>
  {
      if(connected && !client)
      {
        let onMessage = (msg: string) => setMessages(prev => [...prev, msg]);
        setClient(new Client(username, 'localhost', 3000, onMessage))
      }

  },[connected, username, client]);

  const submit = (msg: string) =>
  {
    if (msg === "exit") 
    {
      client?.exit();
      process.exit(0);
    }
    client?.sendMessage(msg);

    setMessages([...messages, msg]);

    setInput('');
  };

  if(!connected)
  {
    return(
      <Box flexDirection='column'>
        <Text>Enter A Username: </Text>
        <TextInput value={username} onChange={setUsername} onSubmit={(usr) => {setUsername(usr); setConnection(true);}}/>
      </Box>
    )
  }


  return (
  <Box flexDirection="column">
    {messages.map((msg, i) => (<Text color = "yellow" key={i}>{msg}</Text>))}

    <Text color="green">
      &gt;&nbsp; <TextInput value={input} onChange={setInput} onSubmit={submit}/>
    </Text>
  </Box>
  );
};

render(<App />);
