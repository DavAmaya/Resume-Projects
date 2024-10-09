import React from "react";
import { useState } from "react";
import { Button, ModalFooter } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";


const Employee = () => {
  //assign runttime
  const [runtime, setRuntime] = useState('');
  const [runtime2, setRuntime2] = useState('');
  const [runtime3, setRuntime3] = useState('');

  //use state to access table employees
  const [ssn, setSSN] = useState("");
  const [dob, setDOB] = useState("");
  const [Fname, setFname] = useState("");
  const [Minit, setMinit] = useState("");
  const [Lname, setLname] = useState("");
  const [empList, setList] = useState([]);

  //use cases for modal to add and update the table
  const [show, setShow] = useState(false);
  const addHandleClose = () => setShow(false);
  const addHandleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleClose = () => setShowUpdate(false);
  const handleShow = () => setShowUpdate(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const deleteHandleClose = () => setShowConfirm(false);
  const deleteHandleShow = () => setShowConfirm(true);

  //to access the employees table and update
  const [updateSSN, setUpdatedSSN] = useState("");
  const [updateDob, updatedDOB] = useState("");
  const [updatedFname, setUpdatedFname] = useState("");
  const [updatedMinit, setUpdatedMinit] = useState("");
  const [updatedLname, setUpdatedLname] = useState("");

  const [deleteBySSN, setDeleteBySSN] = useState("");

  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if(!!errors[field]){
      setErrors({...errors, [field]: null});
    }
  };

  const formattedEmpList = empList.map((emp) => {
    const dateObj = new Date(emp.dob); // Create a Date object from the dob string
    const formattedDate = `${dateObj.getMonth() + 1} / ${dateObj.getDate()} / ${dateObj.getFullYear()}`; // Format the date as dd/mm/yyyy
    return { ...emp, dob: formattedDate }; // Return a new object with the formatted date
  });

  //display the employee table
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getEmp").then((response) => {
      setList(response.data);
    });
  }, []);

  const validateFrom = () => {
    const {ssn, dob, Fname, Lname} = form;
    const newErrors = {};

    if(!dob || dob === ''){
      newErrors.dob = 'Please enter date of birth.';
    }
    if(!ssn || ssn === ''){
      newErrors.ssn = 'Please enter ssn.';
    }else if (ssn.length < 9 || ssn.length > 9){
      newErrors.ssn = 'Not a ssn.';
    }
    else if (empList.find((val) => val.SSN === ssn)){
      newErrors.ssn = 'ssn already exists';
    }
    if(!Fname || Fname === ''){
      newErrors.Fname = 'Please enter first name.';
    }
    if(!Lname || Lname === ''){
      newErrors.Lname = 'Please enter last name.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    if (e) {
     e.preventDefault();
    }

    const errorsForm = validateFrom();

    if (Object.keys(errorsForm).length > 0){
      setErrors(errorsForm)
    } else {
      setForm({});
      console.log('Added')
    }

    //save employee
  };

  //insert func to insert and refresh after insert also error checks based on ssn
  const submitEmp = async (ssn) => {
    if (empList.find((val) => val.SSN === ssn) || ssn === '' || ssn.length > 9 || ssn.length < 9 
    || dob === '' || Fname === '' || Lname === ''){
      handleSubmit();
    }else{
    Axios.post("http://localhost:3001/api/insert", {
      ssn: ssn,
      dob: dob,
      Fname: Fname,
      Minit: Minit,
      Lname: Lname,
    }).then((response) => {
      setRuntime2(response.data.runtime)
      return response.data
    });

    setList([
      ...empList,
      { SSN: ssn, dob: dob, Fname: Fname, Minit: Minit, Lname: Lname },
    ]);
    setForm({});
    addHandleClose();
    setAlert2(true);
  }
  };

  //delete func
  const deleteEmp = () => {
    Axios.delete(`http://localhost:3001/api/delete/${deleteBySSN}`).then((response) => {
      setRuntime3(response.data.runtime)
      return response.data
    }).then(() => {
      Axios.get("http://localhost:3001/api/getEmp").then((response) => {
      setList(response.data);
    });
    });
    deleteHandleClose();
    setAlert3(true);
  };

  //update func
  const updateEmp = () => {
    Axios.put(`http://localhost:3001/api/update/`, {
      ssn: updateSSN,
      dob: updateDob,
      Fname: updatedFname,
      Minit: updatedMinit,
      Lname: updatedLname,
    }).then((response) => {
      setRuntime(response.data.runtime)
    }).then(() => {
      Axios.get("http://localhost:3001/api/getEmp").then((response) => {
      setList(response.data);
    })});  
    setUpdatedSSN("");
    updatedDOB("");
    setUpdatedFname("");
    setUpdatedMinit("");
    setUpdatedLname("");
    setAlert(true);
    handleClose();
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



  const [search, setSearch] = useState("");

  return (
    <>
      <div >
        <div>
        <div>
          <div className="Searchbar">
            <div className="App">
            <Alert variant="success" show={alert} onClose={() =>{setAlert(false)}} dismissible>
        <Alert.Heading>Successfully Updated Employee!</Alert.Heading>
        <p>Runtime for update was {runtime} ms</p>
      </Alert>

      <Alert variant="success" show={alert2} onClose={() =>{setAlert2(false)}} dismissible>
        <Alert.Heading>Successfully Added Employee!</Alert.Heading>
        <p>Runtime for insertion was {runtime2} ms</p>
      </Alert>

      <Alert variant="danger" show={alert3} onClose={() =>{setAlert3(false)}} dismissible>
        <Alert.Heading>Employee Delete!</Alert.Heading>
        <p>Runtime for deletion {runtime3} ms</p>
      </Alert>
       </div>     
            <Row>
              <Col xs="auto">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search By First Name"
                    className="mb-2"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button
                  variant="primary"
                  className="mb-2"
                  onClick={addHandleShow}
                >
                  Add Employee
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Modal show={show} onHide={() => {
            setForm({});
            setErrors({});
            addHandleClose();}}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="myForm" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <FloatingLabel
                  controlId="floatingInput"
                  label="SSN"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    maxLength={9}
                    type="number"
                    name="ssn"
                    value={form.ssn}
                    isInvalid={!!errors.ssn}
                    onChange={(e) => {
                      
                      setField('ssn', e.target.value);
                      setSSN(e.target.value);
                    }}
                    placeholder="SSN"
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                   <div className="red">{errors.ssn}</div>
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Date of Birth"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    pattern="[0-9]+"
                    type="date"
                    name="dob"
                    value={form.dob}
                    isInvalid={!!errors.dob}
                    placeholder="1999-01-26"
                    onChange={(e) => {
                      
                      setField('dob', e.target.value);
                      setDOB(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                   <div className="red">{errors.dob}</div>
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    maxLength={20}
                    type="text"
                    name="Fname"
                    value={form.Fname}
                    isInvalid={!!errors.Fname}
                    placeholder="First Name"
                    onChange={(e) => {
                      
                      setField('Fname', e.target.value);
                      setFname(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                   <div className="red">{errors.Fname}</div>
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Middle Initial"
                  className="mb-3"
                >
                  <Form.Control
                    maxLength={1}
                    type="text"
                    name="Minit"
                    value={form.Minit}
                    isInvalid={!!errors.Minit}
                    placeholder="Middle Initial"
                    onChange={(e) => {
                      
                      setMinit(e.target.value);
                    }}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    maxLength={20}
                    name="Lname"
                    type="text"
                    value={form.Lname}
                    isInvalid={!!errors.Lname}
                    placeholder="Last Name"
                    onChange={(e) => {
                      
                      setField('Lname', e.target.value);
                      setLname(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                   <div className="red">{errors.Lname}</div>
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Form>
          </Modal.Body>
          <ModalFooter>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                submitEmp(ssn);
              }
            }
            >
              Add
            </Button>
            <Button variant="warning" onClick={() => {
            setForm({});
            setErrors({});
            addHandleClose();}}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>SSN</th>
              <th>DOB</th>
              <th>First Name</th>
              <th>Middle Initial</th>
              <th>First Name</th>
              <th>Modify</th>
            </tr>
          </thead>

          {
            // eslint-disable-next-line
            formattedEmpList
              .filter((val) => {
                if (search === "") {
                  return val;
                } else if (
                  val.Fname.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val) => {
                return (
                  <tbody>
                    <tr>
                      <td>{val.SSN}</td>
                      <td>{val.dob}</td>
                      <td>{val.Fname}</td>
                      <td>{val.Minit}</td>
                      <td>{val.Lname}</td>
                      <td>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            handleShow();
                            setUpdatedSSN(val.SSN);
                          }}
                        >
                          Update
                        </Button>
                        <Modal show={showUpdate} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Update Employee</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                  type="date"
                                  placeholder="1999-01-26"
                                  onChange={(e) => {
                                    updatedDOB(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="First Name"
                                  onChange={(e) => {
                                    setUpdatedFname(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Middle Initial</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Middle Initial"
                                  onChange={(e) => {
                                    setUpdatedMinit(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Last Name"
                                  onChange={(e) => {
                                    setUpdatedLname(e.target.value);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={() => {
                                updateEmp(val.SSN);
                              }}
                            >
                              update
                            </Button>
                            <Button variant="warning" onClick={handleClose}>
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <div style={{ marginBottom: 10 }}></div>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteHandleShow();
                            setDeleteBySSN(val.SSN)
                          }}
                        >
                          Delete
                        </Button>

                        <Modal show={showConfirm} onHide={deleteHandleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p>Are you Sure you want to delete Employee?</p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              type="submit"
                              onClick={() => {
                                deleteEmp(val.SSN);
                              }}
                            >
                              Confirm
                            </Button>
                            <Button variant="warning" onClick={deleteHandleClose}>
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  </tbody>
                );
              })
          }
        </Table>
      </div>
      </div>
    </>
  );
};

export default Employee;
