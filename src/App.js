import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import UserContext from "./Context/UserContext"

import Timeline from "./pages/Timeline/Timeline";
import MyPosts from './pages/MyPosts';
import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"

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
          <Route path="/my-posts" exact component={MyPosts} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
