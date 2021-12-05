import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
Navbar,
NavbarBrand,
Row,
CardText,
CardTitle, 
Card, 
NavbarToggler, 
Table, 
Button, 
Modal, 
ModalHeader, 
ModalFooter, 
ModalBody, 
Form, 
FormGroup, 
Label, 
Col, 
Input 
} from "reactstrap"
import Container from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import moment from "moment";


const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleInput, setTitleInput ] = useState("")
  const [typeInput, setTypeInput ] = useState("")
  const [categoryInput, setCategoryInput ] = useState("")
  const [valueInput, setValueInput ] = useState("")
  const [transactionData, setTransactionData] = useState([])
  const [totalEnd, setTotalEnd] = useState(0)
  const [totalEntrance, setTotalEntrance] = useState(0)
  const [total, setTotal] = useState(0)
  const[filterType, setFilterType] = useState("")
  const[filterCategory, setFilterCategory] = useState("")
  const deleteTransaction = (idx) => {
      if (window.confirm("Tem certeza que deseja excluir esta trasação ?")){
          delete transactionData[idx]
          let newTransactionData = transactionData.filter(item => item !== undefined)
          setTransactionData(newTransactionData)
      }
  }
  /*const editTransaction = () => {

  }*/
  const totalAsJSON = JSON.stringify(total)
  localStorage.setItem('mykey',totalAsJSON)
  
  useEffect(() => {
    const totalEndCard = transactionData
    .filter(item => item.type === "Saida")
    .map(item => Number(item.value))
    .reduce((preview, current) => preview + current, 0)
    setTotalEnd(totalEndCard)

    const totalEntranceCard = transactionData
    .filter(item => item.type === "Entrada")
    .map(item => Number(item.value))
    .reduce((preview, current) => preview + current, 0)
    setTotalEntrance(totalEntranceCard)

    setTotal(totalEntranceCard - totalEndCard)
  }, [transactionData])


  const toggleModal = () => setShowModal(!showModal)
  const addTransaction = () => {
      const newTransaction = {
        title: titleInput,
        type: typeInput,
        category: categoryInput,
        value: valueInput,
        date: new Date()
      }
      setTransactionData([...transactionData, newTransaction])
      setTitleInput("")
      setCategoryInput("")
      setTypeInput("")
      setValueInput("")
  }


  return (<>
    <Modal
      isOpen={showModal}
      toggle={toggleModal}
    >
      <ModalHeader toggle={toggleModal}>
        Nova Transação
      </ModalHeader>
      <ModalBody>
        <Form>

          <FormGroup row>
            <Label
              for="title-transaction"
              sm={2}
            >
              Titulo
            </Label>
            <Col sm={10}>
              <Input 
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                id="title-transaction"
                name="title"
                placeholder="Informe o titulo"
                type="text"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label
              for="type-transaction"
              sm={2}
            >
              Tipo
            </Label>
            <Col sm={10}>
              <Input
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                id="type-transaction"
                name="type"
                type="select"
              >
                <option value ={''} >
                  Selecione o tipo 
                </option> 
                <option value = {"Entrada"}>
                  Entrada
                </option> 
                <option value = {"Saida"}>
                Saida
                </option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label
              for="category-transaction"
              sm={2}
            >
              Categoria
            </Label>
            <Col sm={10}>
              <Input
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                id="category-transaction"
                name="category"
                type="select"
              >
                <option value ={''} >
                  Selecione uma categoria 
                </option> 
                <option value = {"Pix"}>
                  Pix
                </option> 
                <option value = {"Ted"}>
                  Ted
                </option>
              </Input>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label
              for="value-transaction"
              sm={2}
            >
              Valor
            </Label>
            <Col sm={10}>
              <Input
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                id="value-transaction"
                name="value"
                placeholder="Informe o valor"
                type="number"
              />
            </Col>
          </FormGroup>

        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={addTransaction}
        >
          Adicionar
        </Button>
        {' '}
        <Button onClick={toggleModal}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
    <Navbar
      color="light"
      expand="md"
      light
    >
      <NavbarBrand href="/">
        SenFinança
      </NavbarBrand>
      <NavbarToggler onClick={function noRefCheck() { }} />
      <div>
        <Button
          color="primary"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faPlus} /> {' '}Nova Transação
        </Button>

      </div>
    </Navbar>
     <Container>
      <h4>Totais</h4>
    <hr/>
   <Row>
  <Col sm="4">
    <Card body>
      <CardTitle tag="h5">
      Entrada
      </CardTitle>
      <CardText>
      R$ {totalEntrance.toFixed(2)}
      </CardText>
    </Card>
  </Col>
   <Col sm="4">
    <Card body>
      <CardTitle tag="h5">
          Saida
      </CardTitle>
      <CardText>
        R$ {totalEnd.toFixed(2)}
      </CardText>
    </Card>
  </Col>
  <Col sm="4">
    <Card body>
      <CardTitle tag="h5">
        Saldo
      </CardTitle>
      <CardText>
        R$ {total.toFixed(2)}
      </CardText>
    </Card>
  </Col>
</Row>
    </Container>
    
    <Container>
    <h4>Filtros</h4>
    <hr/>
     <Form>
        <Row>
  <Col sm="6">
      <FormGroup >
            <Label
              for="type-transaction"
            >
              Tipo
            </Label>
              <Input
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                id="type-transaction"
                name="type"
                type="select"
              >
                <option value ={''} >
                  Todos
                </option> 
                <option value = {"Entrada"}>
                  Entrada
                </option> 
                <option value = {"Saida"}>
                Saida
                </option>
              </Input>
          </FormGroup>
  </Col>
   <Col sm="6">
          <FormGroup >
            <Label
              for="category-transaction"
            >
              Categoria
            </Label>
              <Input
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                id="category-transaction"
                name="category"
                type="select"
              >
                <option value ={''} >
                  Todos
                </option> 
                <option value = {"Pix"}>
                  Pix
                </option> 
                <option value = {"Ted"}>
                  Ted
                </option>
              </Input>
          </FormGroup>
  </Col>
  
</Row>
         

        
        </Form>
   
    </Container>
    <Container>
    
      <Table>
        <thead>
          <tr>
            <th>Ações</th>
            <th>Titulo</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
        {transactionData
        .filter(item => filterType === "" || filterType === item.type)
        .filter(item => filterCategory === "" || filterCategory === item.category)
        .map((line, idx) =>
          <tr>
            <th scope="row">
              <FontAwesomeIcon  icon={faEdit} />{' '}
              <FontAwesomeIcon onClick={() => {deleteTransaction(idx)}} style={{cursor:"pointer", marginRigth:"10px"}}  icon={faTrash} />
            </th>
            <td>{line.title}</td>
            <td>{line.type}</td>
            <td>{line.category}</td>
            <td>R$ {Number(line.value).toFixed(2)}</td>
            <td>{moment(line.date).format("DD/MM/YYYY HH:mm")}</td>
          </tr>
        )}
        </tbody>
      </Table>
      
    </Container>
  </>
  );
};

export default Main