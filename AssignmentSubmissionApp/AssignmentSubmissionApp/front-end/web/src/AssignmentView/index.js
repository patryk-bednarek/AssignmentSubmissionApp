import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";

const AssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState(null);

    useEffect(() => {
        fetch(`/api/assignments/${assignmentId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(assignmentData => {
            setAssignment(assignmentData);
        });
    }, [])
    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>Github URL: <input type="url" id="githubUrl"/></h3>
                    <h3>Branch: <input type="text" id="branch" /></h3>
                    <button>Submit Assignment</button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignmentView;