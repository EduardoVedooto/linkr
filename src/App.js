import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import { useEffect, useState } from "react";
import UserContext from "./Context/UserContext"
import SelectedContext from "./Context/SelectedContext"
import Authenticated from "./Authenticated";

function App() {
  const [user, setUser] = useState();
  const [selected, setSelected] = useState();

  return (
    <UserContext.Provider value={{ user: user || JSON.parse(localStorage.user), setUser }}>
      <SelectedContext.Provider value={{ selected, setSelected }}>
        <BrowserRouter>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route component={Authenticated} />
          </Switch>
        </BrowserRouter>
      </SelectedContext.Provider>
    </UserContext.Provider>
  )
}

export default App;