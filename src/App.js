import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import { useState } from "react";
import UserContext from "./Context/UserContext"
import Authenticated from "./Authenticated";

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user: user || JSON.parse(localStorage.user), setUser }}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route component={Authenticated} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;