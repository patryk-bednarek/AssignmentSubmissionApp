import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";
import ajax from "../Services/fetchService";
import {Badge, Button, Card, Col, Row} from "react-bootstrap";



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
            <div className="mb-4">
                <Button size="lg" onClick={() => createAssignment()}>Submit new assignment</Button>
            </div>
            {assignments ? (
                <div className="d-grid gap-5"
                     style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)"}}>
                    {assignments.map((assignment) => (

                        <Col>

                            <Card key={assignment.id} style={{width: "18rem", height: "18rem"}}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                        <Badge pill
                                               bg="info"
                                               style={{
                                                   fontSize: "1em",
                                               }}>
                                            {assignment.status}
                                        </Badge>
                                    </div>
                                    <Card.Text style={{ marginTop: "1em" }}>
                                        <p>
                                            <b>GitHub URL: </b>{assignment.githubUrl}
                                        </p>
                                        <p>
                                            <b>Branch: </b>{assignment.branch}
                                        </p>
                                    </Card.Text>

                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                        window.location.href = `/assignments/${assignment.id}`;
                                    }}>Edit
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </div>
            ) : (
                <></>
            )}

        </div>

    );
};

export default Dashboard;