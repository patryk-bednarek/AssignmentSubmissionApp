import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    console.log(username);
    function sendLoginRequest () {

        console.log("I`m sending a request!")
        const reqBody = {
            "username": username,
            "password": password
        }


        fetch('/api/auth/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200)
                    Promise.all([response.json(), response.headers]);
                else
                    return Promise.reject("Invalid login attempt");
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "dashboard";
            }).catch((message) => {
            alert(message);
            });
    }
    return (
    <>
        <div>
            <label htmlFor='username'>Username</label>
            <input type="email"
                   id="username"
                   value={username}
                   onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input type="password"
                   id="password"
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div>
            <button id="submit"
                    type="button"
                    onClick={() => sendLoginRequest()}>Login</button>
        </div>
    </>
    );
};

export default Login;