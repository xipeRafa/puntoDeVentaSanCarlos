import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authApp } from '../firebase/firebaseConfig';


export const RegisterComp = () => {


  const { register } = useContext(AuthContext);
  
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

 /*  const nameRef = useRef(); */
  const emailRef = useRef();
  const passwordRef = useRef();
  const cmfPasswordRef = useRef();



  const openForm = () => setShowForm(true);
  const closeForm = () => {
        setError("");
        setShowForm(false)
    }
  
  const submitForm = async (e) => {

      e.preventDefault();

      setError('');

      if (passwordRef.current.value !== cmfPasswordRef.current.value) {
          return setError("Claves No son iguales.");
      }

      if (passwordRef.current.value.length < 6) {
          return setError("Claves es muy corta Use 6 caracteres Minimo");
      }

      register(authApp, emailRef.current.value, passwordRef.current.value);
      closeForm();
   
  };

  return (
    <>
      <div onClick={openForm} className="btn btn-outline-primary mx-2 d-none">
                Registro
            </div>

            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>

                    <Modal.Header>
                        <Modal.Title>Registro</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirmar Password</Form.Label>
                            <Form.Control type="password" required ref={cmfPasswordRef}/>
                        </Form.Group>
                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}> Cancelar </Button>
                        <Button variant="primary" type="submit"> Registro </Button>
                    </Modal.Footer>

                </form>
            </Modal>
    </>
  );
};
