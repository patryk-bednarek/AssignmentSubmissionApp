import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Badge, Button, ButtonGroup, Col, Container, DropdownButton, Form, Row, Dropdown} from "react-bootstrap";

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
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col >
                    <h1>Assignment {assignmentId}</h1>
                </Col>
                <Col>
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                        {assignment.status}
                    </Badge>
                </Col>
            </Row>
            {assignment ? (
                <>
                    <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            Assignment number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                as={ButtonGroup}
                                id="assignmentName"
                                variant={"info"}
                                title="Assignment 1"
                            >
                                {['1','2','3','4','5','6'].map(assignmentNum => <Dropdown.Item eventKey={assignmentNum}>
                                    {assignmentNum}
                                </Dropdown.Item>)}
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            GitHub URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="githubUrl"
                                type="url"
                                onChange={(event) => updateAssignment("githubUrl", event.target.value)}
                                value={assignment.githubUrl}
                                placeholder="https://github.com/username/repo-name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                id="branch"
                                type="text"
                                onChange={(event) => updateAssignment("branch", event.target.value)}
                                value={assignment.branch}
                                placeholder="main" />
                        </Col>
                    </Form.Group>

                    <Button size="lg" onClick={() => save()}>
                        Submit Assignment
                    </Button>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;