
import { Redirect } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "routers/Auth";
import Home from "routers/Home";
import Profile from "routers/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn,userObj }) => {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            {isLoggedIn ? <Navigation /> : null}
            <Switch>
                {isLoggedIn ?
                    <><Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile/>
                    </Route>
                    </>
                    :
                    <>
                    <Route path="/">
                        <Auth />
                    </Route>
                    <Redirect from="*" to= "/" />
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;