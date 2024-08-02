import './App.css';
import Login from '../Login';
import { useState } from 'react';


function App() {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <div className="App">
       {!authenticated && <Login onAuthenticate={() => setAuthenticated(true)}/>}
    </div>
  );
}

export default App;
