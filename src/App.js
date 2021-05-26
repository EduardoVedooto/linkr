import GlobalStyles from "./styles/GlobalStyles";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Timeline from "./pages/Timeline/Timeline";
import UserID from "./pages/UserID/UserID";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Switch>
        <Route path="/timeline" exact component={Timeline} />

        <Route path="/user/:idUser" exact component={UserID} />


      </Switch>
   
        
  


    </BrowserRouter>
  );
}

export default App;
