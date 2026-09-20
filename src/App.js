import './App.css';
import {useState} from 'react';




function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(promptText) {
    if (!promptText.trim()) return;
    setIsLoading(true);
    setOutput('');
    try {
      const res = await fetch('https://woblerback.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Request failed: ${res.status}`);
      }
      const data = await res.json();
      setOutput(data.reply);
    } catch (err) {
      setOutput('Something went wrong: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h3>Wobler-jpt</h3>
        </div>
        <div className="outputdiv">
          <span className="outputspan">
            <p className="outputtext">{(output !== "") ? output : 'Nothing to see here. Provide wobler-jpt with the beginning of the output string :)'}</p>
          </span>
        </div>
        <div className="inputdiv">
          <input className="inputinput" placeholder="Enter the beggining of the output" onChange={e => setInput(e.target.value)}></input>
          <button className="sendbutton" onClick={() => sendMessage(input)} disabled={isLoading}>
            {isLoading ? '...' : 'Enter'}
          </button>
        </div>

      </header>
    </div>
  );
};

export default App;
