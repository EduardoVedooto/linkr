import Timeline from "./pages/Timeline/Timeline";
import UserID from "./pages/UserID/UserID";
import Hashtag from "./pages/Hashtag/Hashtag";
import { Switch, Route } from "react-router";

function Authenticated(){
    return(
        <>
            <Switch>
                <Route path="/timeline" exact component={Timeline}/>
                <Route path="/user/:idUser" exact component={UserID} />
                <Route path="/Hashtag/:hashtag" exact component={Hashtag} />
            </Switch>
        </>
    )
}

export default Authenticated;