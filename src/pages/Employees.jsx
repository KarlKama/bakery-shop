import React, {useRef, useEffect, useState} from 'react'
import { Button, Table } from "react-bootstrap";
import validator from 'validator';
import "../css/Employees.css"

const Employees = () => {

  // TODO: Load data from backend service

  const [employees, setEmployees] = useState([]); // paneme algse tühja seisu pakiautomaatidele
  const [employeesCopy, setEmployeesCopy] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const url = "https://reqres.in/api/users";

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    fetch(url)          // küsib async urlist andmeid, jätkab lehe laadimist, kui on andmed olemas siis läheb edasi (nagu await)
      .then(response => response.json())
      .then(json => {
        setEmployees(json.data);
        setEmployeesCopy(json.data);
      })
  }, [])

  const findIndex = (id, list) => {
    return list.findIndex(employee => employee.id === id);
   }

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table

    if (validator.isEmpty(firstNameRef.current.value) || !validator.isAlpha(firstNameRef.current.value)) {
      setErrorMessage("Please provide a valid first name.");
      return
    }

    if (!validator.isAlpha(lastNameRef.current.value)) {
      setErrorMessage("Please provide a valid last name.");
      return
    }

    if (validator.isEmpty(avatarRef.current.value)) {
      setErrorMessage("Please provide a valid avatar.");
      return
    }

    if (!validator.isEmail(emailRef.current.value)) {
      setErrorMessage("Please provide a valid email.");
      return
    }

    const previousMaximumId = Math.max(...employeesCopy.map(product => product.id));
  
    employeesCopy.push(
      {
        "id": previousMaximumId + 1,
        "email": emailRef.current.value,
        "first_name": firstNameRef.current.value,
        "last_name": lastNameRef.current.value,
        "avatar": avatarRef.current.value,
      }
    )
    setEmployees(employeesCopy.slice());
  }

  const deleteEmployee = (id) => {
    // TODO: Delete an employee from the table

    const index = findIndex(id, employeesCopy);
    employeesCopy.splice(index, 1);
    setEmployees(employeesCopy.slice());

  }

  return (
  <div>
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      <Table className="table table-hover table-bordered table-sortable">
        <thead>
        <tr>
          <th scope="col">Avatar</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          employees.map(employee =>
            <tr key={employee.id}>
              <td>
                <img src={employee.avatar} alt='Avatar'/>
              </td>
              <td>{employee.id}</td>
              <td>{employee.first_name + " " + employee.last_name}</td>
              <td>{employee.email}</td>
              <td><Button type="button" variant="danger" onClick={() => deleteEmployee(employee.id)}>Delete</Button></td>
            </tr>
        )
        }

        <tr className="input-row">
          <td><input ref={avatarRef} type="text" placeholder="Avatar" className="form-control"/></td>
          <td><input ref={firstNameRef} type="text" placeholder="First name" className="form-control"/></td>
          <td><input ref={lastNameRef} type="text" placeholder="Last name" className="form-control"/></td>
          <td><input ref={emailRef} type="text" placeholder="Email" className="form-control"/></td>
          <td><Button onClick={addEmployee} variant="success">Add</Button></td>
        </tr>
        </tbody>
      </Table>
      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}
    </div>

  </div>
  )
}

export default Employees;