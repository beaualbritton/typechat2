import { useState, type FormEvent } from 'react'
import { useClient } from './lib/hooks/useClient.ts';
import './App.css'

function App() {

  const [input, setInput] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [connected, setConnection] = useState<boolean>(false);

  const {messages, sendMessage} = useClient(username, connected);

  const submit = (e: FormEvent) =>
  {
    e.preventDefault();
    sendMessage(input)
    setInput('');
  };

  if(!connected)
  {
    return(
      <div className="flex flex-col">
        <p>Enter A Username: </p>
        <form onSubmit={(e) => {e.preventDefault(); setConnection(true);}}>
          <input value={username} onChange={(e) => setUsername(e.target.value)}/>
          <button type="submit">Connect</button>
        </form>
      </div>
    )
  }

  return (
  <div className="flex flex-col">
    <div>
      {messages.map((msg:string, i:number) => (<p key={i}>{msg}</p>))}
    </div>

    <form onSubmit={submit}>
      &gt;&nbsp; <input value={input} onChange={(e) => setInput(e.target.value)}/>
      <button type="submit">Send</button>
    </form>
  </div>
  );
};

export default App;
