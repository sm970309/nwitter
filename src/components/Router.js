import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";

const AppRouter = () => {
    const [islogin, setIsLogin] = useState(false);
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                {islogin ?
                    <Route path="/">
                        <Home/>
                    </Route>
                    :
                    <Route path="/">
                        <Auth/>
                    </Route>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;