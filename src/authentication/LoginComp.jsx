import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useContext, useRef, useState } from "react";

import { authApp } from "../firebase/firebaseConfig";

import { AuthContext } from "../context/AuthContext";




export const LoginComp = () => {

    const { login } = useContext(AuthContext);

    const [showForm, setShowForm] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);



    const submitForm = (e) => {

        e.preventDefault();

        localStorage.removeItem("Done");

        login(authApp, emailRef.current.value, passwordRef.current.value)
        
        closeForm()

    }



    return (
        <>
            <div onClick={openForm} className="btn btn-outline-primary mx-2">
                Entrar
            </div>

            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>

                    <Modal.Header>
                        <Modal.Title>Entrar</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>

                        <Form.Group>
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>

                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}> Cancelar </Button>
                        <Button variant="primary" type="submit">         Entrar </Button>
                    </Modal.Footer>

                </form>
            </Modal>

        </>
    );
};
