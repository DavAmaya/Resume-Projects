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

const Hourly = () => {
  //assign runttime
  const [runtime, setRuntime] = useState("");
  const [runtime2, setRuntime2] = useState("");
  const [runtime3, setRuntime3] = useState("");

  //use state to access table employees
  const [ssn, setSSN] = useState("");
  const [hourly, setHourly] = useState("");
  const [List, setList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [manList, setManList] = useState([]);

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
  const [updateHourly, updatedHourly] = useState("");

  const [deleteBySSN, setDeleteBySSN] = useState("");

  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  //display the employee table
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getHr").then((response) => {
      setList(response.data);
    });
  }, []);

  const formattedEmpList = List.map((emp) => {
    const formattedWage = Number(emp.hourly).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return { ...emp, hourly: formattedWage };
  });

  console.log(formattedEmpList);

  const validateFrom = () => {
    Axios.get("http://localhost:3001/api/getEmp").then((response) => {
      setEmpList(response.data);
    });

    Axios.get("http://localhost:3001/api/getMan").then((response) => {
      setManList(response.data);
    });
    const { ssn, hourly } = form;
    const newErrors = {};

    if (!hourly || hourly === "") {
      newErrors.hourly = "Please enter houlry wage.";
    }
    if (!ssn || ssn === "") {
      newErrors.ssn = "Please enter ssn.";
    } else if (ssn.length < 9 || ssn.length > 9) {
      newErrors.ssn = "Not a ssn.";
    }else if (
        List.find((val) => val.SSN === ssn) &&
        !manList.find((val) => val.SSN === ssn) &&
        empList.find((val) => val.SSN === ssn) &&
        ssn.length === 9
      ) {
        newErrors.ssn = "Employee hourly exist.";
      } else if (
      manList.find((val) => val.SSN === ssn) &&
      empList.find((val) => val.SSN === ssn) &&
      List.find((val) => val.SSN === ssn) &&
      ssn.length === 9
    ) {
      newErrors.ssn = "Employee is a Manager";
    } else if (
      !empList.find((val) => val.SSN === ssn) &&
      !manList.find((val) => val.SSN === ssn) &&
      List.find((val) => val.SSN === ssn) &&
      ssn.length === 9
    ) {
      newErrors.ssn = "Employee does not exist.";
    }

    console.log(newErrors);

    return newErrors;
  };

  //default handler to submit forms
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const errorsForm = validateFrom();

    if (Object.keys(errorsForm).length > 0) {
      setErrors(errorsForm);
    } else {
      setForm({});
      console.log("Added");
    }
    //save employee
  };

  //insert func to insert and refresh after insert
  const submitEmp = async () => {
    if (
      manList.find((val) => val.SSN === ssn) ||
      !empList.find((val) => val.SSN === ssn) ||
      List.find((val) => val.SSN === ssn) ||
      ssn === "" ||
      ssn.length > 9 ||
      ssn.length < 9 ||
      hourly === ""
    ) {
      handleSubmit();
    } else {
      Axios.post("http://localhost:3001/api/insertHr", {
        ssn: ssn,
        hourly: hourly,
      }).then((response) => {
        setRuntime2(response.data.runtime);
        return response.data;
      });

      setList([...List, { SSN: ssn, hourly: hourly }]);
      setForm({});
      addHandleClose();
      setAlert2(true);
    }
  };

  //delete func
  const deleteEmp = () => {
    Axios.delete(`http://localhost:3001/api/deleteHr/${deleteBySSN}`)
      .then((response) => {
        setRuntime3(response.data.runtime);
        return response.data;
      })
      .then(() => {
        Axios.get("http://localhost:3001/api/getHr").then((response) => {
          setList(response.data);
        });
      });
    deleteHandleClose();
    setAlert3(true);
  };

  //update func
  const updateEmp = () => {
    Axios.put(`http://localhost:3001/api/updateHr/`, {
      ssn: updateSSN,
      hourly: updateHourly,
    })
      .then((response) => {
        setRuntime(response.data.runtime);
      })
      .then(() => {
        Axios.get("http://localhost:3001/api/getHr").then((response) => {
          setList(response.data);
        });
      });
    setUpdatedSSN("");
    updatedHourly("");
    setAlert(true);
    handleClose();
  };

  const [search, setSearch] = useState("");

  return (
    <>
      <div>
        <div>
          <div className="Searchbar">
            <div className="App">
              <Alert
                variant="success"
                show={alert}
                onClose={() => {
                  setAlert(false);
                }}
                dismissible
              >
                <Alert.Heading>Successfully Updated Employee!</Alert.Heading>
                <p>Runtime for update was {runtime} ms</p>
              </Alert>

              <Alert
                variant="success"
                show={alert2}
                onClose={() => {
                  setAlert2(false);
                }}
                dismissible
              >
                <Alert.Heading>Successfully Added Employee!</Alert.Heading>
                <p>Runtime for insertion was {runtime2} ms</p>
              </Alert>

              <Alert
                variant="danger"
                show={alert3}
                onClose={() => {
                  setAlert3(false);
                }}
                dismissible
              >
                <Alert.Heading>Employee Delete!</Alert.Heading>
                <p>Runtime for deletion {runtime3} ms</p>
              </Alert>
            </div>
            <Row>
              <Col xs="auto">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Control
                    type="number"
                    placeholder="Search By Wage"
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
                  Add Wage
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          show={show}
          onHide={() => {
            setForm({});
            setErrors({});
            addHandleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Hourly Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel
                  required
                  maxLength={9}
                  controlId="floatingInput"
                  label="SSN"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="ssn"
                    value={form.ssn}
                    isInvalid={!!errors.ssn}
                    maxLength={9}
                    placeholder="SSN"
                    onChange={(e) => {
                      setField("ssn", e.target.value);
                      setSSN(e.target.value);
                    }}
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
                  required
                  controlId="floatingInput"
                  label="Hourly Wage"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="hourly"
                    maxLength={6}
                    placeholder="213"
                    value={form.hourly}
                    isInvalid={!!errors.hourly}
                    onChange={(e) => {
                      setField("hourly", e.target.value);
                      setHourly(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    <div className="red">{errors.hourly}</div>
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Form>
          </Modal.Body>
          <ModalFooter>
            <Button variant="primary" type="submit" onClick={submitEmp}>
              Add
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                setForm({});
                setErrors({});
                addHandleClose();
              }}
            >
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
              <th>Hourly</th>
              <th>Modify</th>
            </tr>
          </thead>
          {formattedEmpList
            .filter((val) => {
              if (search === "") {
                return val;
              } else if (val.hourly === parseFloat(search)) {
                return val;
              }
            })
            .map((val) => {
              return (
                <tbody>
                  <tr key={ssn}>
                    <td>{val.SSN}</td>
                    <td>{val.hourly}</td>
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
                          <Modal.Title>Update Employee Hourly</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form onSubmit={handleSubmit}>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label>Hourly</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="213"
                                onChange={(e) => {
                                  updatedHourly(e.target.value);
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
                          setDeleteBySSN(val.SSN);
                        }}
                      >
                        Delete
                      </Button>
                      <Modal show={showConfirm} onHide={deleteHandleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>
                            Are you Sure you want to delete Employee Hourly
                            Wage?
                          </p>
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
            })}
        </Table>
      </div>
    </>
  );
};

export default Hourly;
