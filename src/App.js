import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Timeline from "./pages/Timeline/Timeline";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route path="/timeline" exact component={Timeline} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
