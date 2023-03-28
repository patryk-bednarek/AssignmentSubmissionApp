import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";

const AssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: ""
    });


    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment [prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
            });
    }

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
            .then((assignmentData) => {
                if (assignmentData.branch === null) assignmentData.branch = "";
                if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
                setAssignment(assignmentData);
            });
    }, []);

    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>Github URL: {" "}
                        <input type="url"
                               id="githubUrl"
                               onChange={(event) => updateAssignment("githubUrl", event.target.value)}
                               value={assignment.githubUrl}
                    />
                    </h3>
                    <h3>Branch: {" "}
                        <input type="text"
                               id="branch"
                               onChange={(event) => updateAssignment("branch", event.target.value)}
                               value={assignment.branch}
                    />
                    </h3>
                    <button onClick={() => save()}>Submit Assignment</button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignmentView;