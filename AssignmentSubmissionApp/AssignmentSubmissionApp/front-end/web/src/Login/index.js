import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Button, Col, Container, Row, Form} from "react-bootstrap";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest () {
        const reqBody = {
            "username": username,
            "password": password
        }

        fetch("/api/auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                if (response.status === 200)
                    return Promise.all([response.json(), response.headers]);
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
            <Container className="mt-5">
                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4">
                                Username
                            </Form.Label>
                            <Form.Control type="email"
                                          value={username}
                                          placeholder="e-mail"
                                          size="lg"
                                          onChange={(event) => setUsername(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label  className="fs-4">
                                Password
                            </Form.Label>
                            <Form.Control type="password"
                                          value={password}
                                          size="lg"
                                          placeholder="Type in your password"
                                          onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col className="mt-3 d-flex flex-column gap-3 flex-md-row justify-content-between"
                         md="8" lg="6">
                        <Button id="submit"
                                type="button"
                                size="lg"
                                onClick={() => sendLoginRequest()}
                        >Login
                        </Button>
                        <Button id="submit"
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={() => {window.location.href = "/";}}
                        >Exit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;