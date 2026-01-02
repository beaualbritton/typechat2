#!/usr/bin/env bun
import { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import {useClient} from "../../lib/hooks/useClient";

const App = () => 
{
const [input, setInput] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('')
  const [connected, setConnection] = useState<boolean>(false);
  const [isNameSet, setIsNameSet] = useState<boolean>(false);

  const {messages, sendMessage} = useClient(username, room, connected);

  const submit = () =>
  {
    sendMessage(input)
    setInput('');
  };

  if(!connected )
  {
    if (!isNameSet)
    {
      return(
      <Box flexDirection='column'>
        <Text>Enter A Username: </Text>
        <TextInput value={username} onChange={setUsername} onSubmit={(usr) => {setUsername(usr); setIsNameSet(true)}}/>
      </Box>
      )
    }
    else
    {
      return(
        <Box flexDirection='column'>
          <Text>Enter A Room Number: </Text>
          <TextInput value={room} onChange={setRoom} onSubmit={(rm) => {setRoom(rm); setConnection(true);}}/>
        </Box>
      )
    }
    
  }


  return (
  <Box flexDirection="column">
    {messages.map((msg: string, i:number) => (<Text color = "yellow" key={i}>{msg}</Text>))}

    <Text color="green">
      &gt;&nbsp; <TextInput value={input} onChange={setInput} onSubmit={submit}/>
    </Text>
  </Box>
  );
};

render(<App />);
