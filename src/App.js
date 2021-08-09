import {
  Button,
  TextField,
  MenuItem,
  createTheme,
  ThemeProvider,
  createMuiTheme,
  Paper,
  Fab,
} from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import SearchIcon from "@material-ui/icons/Search";
import Contries from "./component/contries/Contries";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Definition from "./component/Definition/Definition";
function App() {
  const [mode, setMode] = useState(false);
  const [search, setSearch] = useState(false);
  const darkTheme = createTheme({
    palette: {
      type: !mode ? "dark" : "light",
    },
  });
  const [state, setState] = useState("");
  const [Lang, setLang] = useState("en");
  const [Meanning, setMeanning] = useState([]);
  // console.log(Lang);
  const DictonaryAPI = async () => {
    try {
      const word = state;
      // console.log(word[0].word);
      if (word === "") {
        alert("empty input field");
      }
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${Lang}/${word}`
      );
      const data = await res.json();
      // console.log(data);
      setMeanning(data);
      setSearch(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ height: "100vh" }}>
        <div className="App">
          <Fab className="modes" color="primary" onClick={() => setMode(!mode)}>
            {mode ? <Brightness4Icon /> : <Brightness7Icon />}
          </Fab>
          <h1>{"Words Translater"}</h1>
          <div className="container">
            <TextField
              type="text"
              label="enter Word"
              name="word"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />

            <TextField
              id="standard-select-currency"
              select
              label="Select Language"
              value={Lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {Contries.map((con, index) => (
                <MenuItem key={index} value={con.Short}>
                  {con.Name}
                </MenuItem>
              ))}
            </TextField>
            {
              <Button onClick={DictonaryAPI}>
                <SearchIcon /> {window.innerWidth === 280 ? null : "Search"}
              </Button>
            }
          </div>
          <Definition meanning={Meanning} word={state} lang={Lang} />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
