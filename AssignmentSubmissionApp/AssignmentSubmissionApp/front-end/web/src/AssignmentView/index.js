import React, {useEffect, useRef, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Badge, Button, ButtonGroup, Col, Container, DropdownButton, Form, Row, Dropdown} from "react-bootstrap";

const AssignmentView = () => {
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: "",
        number: null,
        status: null
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const prevAssignmentValue = useRef(assignment);


    async function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment [prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        if (assignment.status === assignmentStatuses[0].status) {
            updateAssignment("status", assignmentStatuses[1].status);
        } else {
            persist();
        }
    }

    function persist() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
            });
    }


    useEffect(() => {
        if (prevAssignmentValue.current.status !== assignment.status) {
            persist();
        }
        prevAssignmentValue.current = assignment;
    }, [assignment]);

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
            .then((assignmentResponse) => {
                let assignmentData = assignmentResponse.assignment;
                if (assignmentData.branch === null) assignmentData.branch = "";
                if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
                setAssignment(assignmentData);
                setAssignmentEnums(assignmentResponse.assignmentEnums);
                setAssignmentStatuses(assignmentResponse.statusEnums)
            });
    }, []);


    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col >
                    {assignment.number ? (<h1>Assignment {assignment.number}</h1>) : (<></>)}

                </Col>
                <Col>
                    <Badge pill bg="info" style={{ fontSize: "1em" }}>
                        {assignment.status}
                    </Badge>
                </Col>
            </Row>
            {assignment ? (
                <>
                    <Form.Group as={Row} className="my-4" controlId="assignmentName">
                        <Form.Label column sm="3" md="2">
                            Assignment number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                as={ButtonGroup}
                                variant={"info"}
                                title={assignment.number ? `Assignment ${assignment.number}` : "Select an Assignment"}
                                onSelect={(selectedElement) => {
                                    updateAssignment("number", selectedElement)
                                }}
                            >
                                {assignmentEnums.map((assignmentEnum) => (
                                    <Dropdown.Item key={assignmentEnum.assignmentNum}
                                                   eventKey={assignmentEnum.assignmentNum}>
                                            {assignmentEnum.assignmentNum}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="my-4" controlId="githubUrl">
                        <Form.Label column sm="3" md="2">
                            GitHub URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                type="url"
                                onChange={(event) => updateAssignment("githubUrl", event.target.value)}
                                value={assignment.githubUrl}
                                placeholder="https://github.com/username/repo-name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="branch">
                        <Form.Label column sm="3" md="2">
                            Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                type="text"
                                onChange={(event) => updateAssignment("branch", event.target.value)}
                                value={assignment.branch}
                                placeholder="main" />
                        </Col>
                    </Form.Group>

                    <div className="d-flex gap-5">
                        <Button size="lg" onClick={() => save()}>
                            Submit Assignment
                        </Button>
                        <Button size="lg"
                                variant="secondary"
                                onClick={() => (window.location.href='/dashboard')}
                        >
                            Back
                        </Button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;