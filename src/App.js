import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import UserContext from "./Context/UserContext"

import SignUp from "./pages/SignUp/SignUp"
import Login from "./pages/Login/Login"
import Timeline from "./pages/Timeline/Timeline";
import UserID from "./pages/UserID/UserID";

function App() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider value={{user, setUser}}>
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        < Route path="/" exact component={Login}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/timeline" exact component={Timeline} />
        <Route path="/user/:idUser" exact component={UserID} />


      </Switch>
   
        
  


    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
