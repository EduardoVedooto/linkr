import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Timeline from "./pages/Timeline/Timeline";
import MyPosts from './pages/MyPosts';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route path="/timeline" exact component={Timeline} />
        <Route path="/my-posts" exact component={MyPosts} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
