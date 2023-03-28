import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";
import ajax from "../Services/fetchService";



const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);


    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then(assignmentsData => {
            setAssignments(assignmentsData)
        })
    }, []);



    function createAssignment() {
        ajax("api/assignments", "POST", jwt)
            .then((assignment) => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }

    return (
        <div style={{margin: '2em'}}>
            {assignments ? (
                assignments.map((assignment) => (
                    <div key={assignment.id}>
                        <Link to={`/assignments/${assignment.id}`}>
                            Assignment ID : {assignment.id}
                        </Link>
                    </div>
                ))
                ) : (
                    <></>
            )}
            <button onClick={() => createAssignment()}>Submit new assignment</button>
        </div>

    );
};

export default Dashboard;