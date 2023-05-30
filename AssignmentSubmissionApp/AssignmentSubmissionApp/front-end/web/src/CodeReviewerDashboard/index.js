import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";



const CodeReviewerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);


    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then(assignmentsData => {
            setAssignments(assignmentsData)
        })
    }, []);



    return (
        <Container>
            <Row>
                <Col>
                    <div  className="d-flex justify-content-end"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                              setJwt(null);
                              window.location.href='/login';
                          }}
                    >
                        Logout
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <div className="h1">Code Reviewer Dashboard</div>
                </Col>
            </Row>
            {/*<div className="assignment-wrapper in-review"></div>*/}
            <div className="assignment-wrapper submited">
                <div className="h3 px-2"
                     style = {{ width: "min-content",
                         marginTop: "-2em",
                         marginBottom: "1em",
                         backgroundColor: "white",
                         whiteSpace: "nowrap"}}
                >
                    Awaiting review
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
            {/*<div className="assignment-wrapper needs-update"></div>*/}



        </Container>

    );
};

export default CodeReviewerDashboard;