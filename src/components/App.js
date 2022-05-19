import {auth} from "myFireBase";
import AppRouter from "components/Router";
import React, { useState } from "react";

function App() {
  console.log(auth)
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
