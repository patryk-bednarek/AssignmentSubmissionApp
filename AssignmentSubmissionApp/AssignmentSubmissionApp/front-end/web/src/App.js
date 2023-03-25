import './App.css';
import {useEffect, useState} from "react";
import {useLocalState} from "./util/useLocalStorage";

function App() {

    const [jwt, setJwt] = useLocalState("", "jwt");


    useEffect(() => {
        if (!jwt) {

            const reqBody = {
                "username": "patryk",
                "password": "asdfasdf"
            }

            fetch('/api/auth/login', {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(reqBody),
            })
                .then((response) => Promise.all([response.json(), response.headers]))
                .then(([body, headers]) => {
                    setJwt(headers.get("authorization"));

                });
        }
    }, []); //empty deps bracket means: run this code once

    useEffect(() => {

    }, [jwt]);

  return (
    <div className="App">
      <div>JWT value is {jwt}</div>
    </div>
  );
}

export default App;
