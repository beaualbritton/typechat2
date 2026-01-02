import { useState, type FormEvent } from 'react'
import { useClient } from '../../lib/hooks/useClient.ts';

function App() {

  const [input, setInput] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('')
  const [connected, setConnection] = useState<boolean>(false);

  const {messages, sendMessage} = useClient(username, room, connected);

  const submit = (e: FormEvent) =>
  {
   e.preventDefault();
    sendMessage(input)
    setInput('');
  };

  if(!connected)
  {
    return(
      <main className="flex flex-col h-screen w-full items-center justify-center">
        <div className="p-4 bg-elevated w-2xl h-96 rounded border-main border-2 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-green font-bold p-2">Typechat Demo</h1>
          <form className="w-2xl flex flex-col items-center justify-center p-4" onSubmit={(e) => {e.preventDefault(); setConnection(true);}}>
            <input className="bg-surface text-xl border border-main text-muted focus:text-green rounded w-full p-4" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='john doe'/>

            <input className="bg-surface text-xl border border-main text-muted focus:text-green rounded italic w-full p-4" value={room} onChange={(e) => setRoom(e.target.value)} placeholder='1234'/>

            <button className="bg-surface text-xl border border-main text-green mt-4 p-4 rounded active:brightness-90 hover:brightness-110" type="submit">Connect</button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <div className="p-4 bg-elevated w-2xl rounded border-main border-2 flex flex-col overflow-y-auto mb-4">
        {messages.map((msg:string, i:number) => (<p key={i} className="text-yellow p-2">{msg}</p>))}
      </div>
      <form className="w-2xl flex items-center bg-surface border border-main rounded p-4" onSubmit={submit}>
        <span className="text-green text-xl">&gt;&nbsp;</span> <input className="bg-surface text-xl text-yellow flex-1 outline-none" value={input} onChange={(e) => setInput(e.target.value)} placeholder="enter a message"/>
        <button className="bg-elevated text-xl border border-main text-green ml-4 px-4 py-2 rounded active:brightness-90 hover:brightness-110" type="submit">Send</button>
      </form>
    </main>
  );
};

export default App;
