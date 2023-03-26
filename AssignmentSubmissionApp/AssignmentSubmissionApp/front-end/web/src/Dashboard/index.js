import React from 'react';
import {useLocalState} from "../util/useLocalStorage";


const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return (

        <div className="App">
            <div>JWT value is {jwt}</div>
        </div>

    );
};

export default Dashboard;