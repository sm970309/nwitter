import firebase from "myFireBase";
import AppRouter from "components/Router";
import React, { useState } from "react";
console.log(firebase)
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
