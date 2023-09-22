import AutoComplete from "./components/Autocomplete";

import data from "./data/data.json";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>AutoComplete Component</h1>
      <AutoComplete data={data} />
    </div>
  );
}

export default App;
