import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import UserContext from "./Context/UserContext"
import SelectedContext from "./Context/SelectedContext"

import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import Timeline from "./pages/Timeline/Timeline";
<<<<<<< HEAD
import UserID from "./pages/UserID/UserID";
import Hashtag from "./pages/Hashtag/Hashtag";

function App() {
  const [user, setUser] = useState();
  const [selected, setSelected] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <SelectedContext.Provider value={{selected, setSelected}}>
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        < Route path="/" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/timeline" exact component={Timeline}/>
        <Route path="/user/:idUser" exact component={UserID} />
        <Route path="/Hashtag/:hashtag" exact component={Hashtag} />

      </Switch>
   
        
  


    </BrowserRouter>
    </SelectedContext.Provider>
    </UserContext.Provider>
    
  )
=======
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
>>>>>>> main
}

export default App;
