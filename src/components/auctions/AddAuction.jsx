import { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
  Modal,
  Alert,
  Row,
  Col /* , Select */,
} from 'react-bootstrap';

import Resizer from "react-image-file-resizer";

import { FireStoreDataContext } from '../../context/FireStoreDataContext';





export const AddAuction = ({ setAuction }) => {
  const { handleFileAdd } = useContext(FireStoreDataContext);

  const[img, setImg]=useState()

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      80,
      0,
      (uri) => {resolve(uri);},"base64");
  });

  const onResize = async (event) => {
    const file = event.target.files[0];

    const image = await resizeFile(file);

    fetch(image).then(res => res.blob())
      .then(blob => {
          const file = new File([blob], Date.now()+'.jpeg',{ type: "image/jpeg" })
          setImg(file)
    })
  };

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const nombre = useRef();
  const para = useRef();
  const category = useRef();
  const precio = useRef();
  const marca = useRef();
  const itemImage = useRef();
  //const itemImageName = useRef();
  const talla = useRef();
  const color = useRef();
  const tela = useRef();
  const stockHermosillo = useRef();

  const stockSanCarlos = useRef();
  const description = useRef();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const submitForm = async (e) => {
    e.preventDefault();

    setError('');

    if (!imgTypes.includes(itemImage.current?.files[0].type)) {
      return setError('por favor use una imagen valida (png, jpeg, jpg)');
    }

    let currentDate = new Date();

    let dueDate = currentDate.setHours(
      currentDate.getHours() /* + itemDuration.current.value */
    );

    let newAuction = {
      email: localStorage.getItem('userEmailLS'),
      name: nombre.current.value,
      para: para.current.value,

      category: category.current.value,
      price: Number(precio.current.value),
      marca: marca.current.value,

      duration: dueDate,

      color: color.current.value,
      tela: tela.current.value,
      stockHermosillo: Number(stockHermosillo.current.value),

      talla: talla.current.value,

      stockSanCarlos: Number(stockSanCarlos.current.value),
      description: description.current.value,
    };

    handleFileAdd(img, newAuction);

    closeForm();
  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3 ">
        <div onClick={openForm} className="btn btn-primary mx-5">
          CREAR INFORME
        </div>
      </div>
      <Modal
        centered
        show={showForm}
        onHide={closeForm}
        style={{ width: '96%', marginLeft: '1%' }}
      >
        <form
          onSubmit={submitForm}
          style={{ backgroundColor: 'rgb(222,222,222)' }}
        >
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col className="border mb-5 btn bg-primary mx-2 p-2 text-center text-white">
                {localStorage.getItem('userEmailLS')}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Imagen</Form.Label>
                <Form.Group>
                  <Form.Control
                    type="file"
                    label="Cargar Foto"
                    required
                    ref={itemImage}
                    onChange={onResize}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" required ref={nombre} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-2">
                <Form.Label>para</Form.Label>
                <Form.Control as="select" multiple={false} ref={para}>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </Form.Control>
              </Col>
            </Row>

            <Row>
              <Col className="mb-2">
                <Form.Label>Categoria</Form.Label>
                <Form.Control as="select" multiple={false} ref={category}>
                  <option value="color">color</option>
                  <option value="blanco">blanco</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>talla</Form.Label>
                <Form.Control type="text" required ref={talla} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>marca</Form.Label>
                  <Form.Control type="text" required ref={marca} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>precio</Form.Label>
                  <Form.Control type="number" required ref={precio} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Form.Control type="text" required ref={color} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-2">
                <Form.Label>tela</Form.Label>
                <Form.Control as="select" multiple={false} ref={tela}>
                  <option value="algodon">algodon</option>
                  <option value="lino">lino</option>
                </Form.Control>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Stock Hermosillo</Form.Label>
                  <Form.Control type="number" required ref={stockHermosillo} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Stock San Carlos</Form.Label>
                  <Form.Control type="number" required ref={stockSanCarlos} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control type="text" required ref={description} />
                </Form.Group>
              </Col>
            </Row>

            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancelar
            </Button>
            <Button variant="primary" disabled={false} type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
