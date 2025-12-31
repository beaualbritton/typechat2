#!/usr/bin/env bun
import { useState } from 'react';
import { render, Box, Text } from 'ink';
import TextInput from 'ink-text-input';

const App = () => 
{
  const [messages, setMessages] = useState<string[]>(['typechat cli demo with ink :P']);
  const [input, setInput] = useState('> ');

  return (
    <Box flexDirection="column">
      {messages.map((msg, i) => (<Text color = "yellow" key={i}>{msg}</Text>))}

      <Text color="green">
        <TextInput value={input} onChange={setInput} onSubmit={(msg) => {setMessages([...messages, msg]); setInput('> ');}}/>
      </Text>
    </Box>
  );
};

render(<App />);
