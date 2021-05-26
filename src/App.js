import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Timeline from "./pages/Timeline/Timeline";
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import { useState } from "react";
import UserContext from "./Context/UserContext"

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/timeline" exact component={Timeline} />
        </Switch>

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
