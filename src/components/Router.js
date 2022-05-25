
import { Redirect } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "routers/Auth";
import Home from "routers/Home";
import Profile from "routers/Profile";
import Signup from "routers/Signup";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn,userObj }) => {

    return (
        <Router basename={process.env.PUBLIC_URL}>
            {isLoggedIn ? <Navigation /> : null}
            <Switch>
                {isLoggedIn ?
                    <div
                    style={{
                      maxWidth: 890,
                      width: "100%",
                      margin: "0 auto",
                      marginTop: 80,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Redirect from="/signup" to= "/" />
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj}/>
                    </Route>
                    
                    </div>
                    :
                    <>
                    <Route exact path="/signup">
                        <Signup/>
                    </Route>
                    <Route exact path="/">
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