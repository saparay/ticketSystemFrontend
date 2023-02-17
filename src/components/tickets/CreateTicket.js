import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { apiClient } from '../api/AuthenticationApiService';
function CreateTicket() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ticketName, setTicketName] = useState('')
    const [priority, setPriority] = useState('')
    const [resolvedBy, setResolvedBy] = useState('')
    const [description, setDescription] = useState('')
    const [isResolved, setIsResolved] = useState(false)
    const [dateOfRise, setDateOfRise] = useState('')
    const [dateOfClose, setDateOfClose] = useState('')
   
    function retriveTicket() {
        if (id != -1) {
            apiClient.get(`/reso/tickets/${id}`).then((response) => {
                console.log(response);
                setTicketName(response.data.ticketName)
                setPriority(response.data.priority)
                setResolvedBy(response.data.resolvedBy)
                setDescription(response.data.description)
                setIsResolved(response.data.isResolved)
                setDateOfRise(response.data.dateOfRise)
                setDateOfClose(response.data.dateOfClose)
            }).catch((err) => {

            });
        }
    }

    useEffect(
        () => retriveTicket(), [id]
    )
    const FormValidations = yup.object({
        ticketName: yup.string().required('Ticket Name Is Must').min(5, "Ticket Name must be at least 5 characters"),
        priority: yup.string().required('Priority Is Must'),
        resolvedBy: yup.string().required('Resolved By Is Must'),
        description: yup.string().required('Description Is Must'),
        isResolved: yup.boolean().required(),
        dateOfClose:yup.date().required("Date Of Close is Required")
    })

    const handleSubmit = (e) => {
        console.log(e);
        const ticket = {
            id: id,
            ticketName: e.ticketName,
            priority: e.priority,
            resolvedBy: e.resolvedBy,
            description: e.description,
            isResolved: e.isResolved.value,
            dateOfRise: e.dateOfRise,
            dateOfClose: e.dateOfClose
        }
        if (id == -1) {
            apiClient.post(`/reso/tickets`, ticket)
                .then((response) => {
                    
                }).catch((err) => {

                });
                var a = window.confirm("Ticket is created. Do you want to exit?")
                if(a){
                    navigate('/tickets')
                }
        } else {
            apiClient.put(`/reso/tickets/${id}`, ticket)
                .then((response) => {
                    console.log(response)
                    navigate('/tickets')
                }).catch((err) => {

                });
                alert("Changes are saved....")
        }
    }

    const GoBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <div className="container" >
                <div className="row">
                    <div className="col-6 m-5 bg-info p-4 rounded-5">
                    <h3>Ticket</h3>
                    <hr />
                        <Formik initialValues={{
                            ticketName, priority, resolvedBy,
                            description, isResolved, dateOfRise, dateOfClose

                        }}
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                            validationSchema={FormValidations}
                        >
                            <Form className='form'>
                                <fieldset className='form-group'>
                                    <label className="form-label">Ticket name: </label>
                                    <Field type='text' name='ticketName' className='form-control' autofocus="autofocus" tabindex='1' placeholder='Ticket Name'/>
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='ticketName' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group m-3'>
                                    <label>Priority:  </label><br />
                                    <Field name="priority" as="select" className='form-comtrol' tabindex='2' placeholder='Priority'>
                                        <option>Select</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </Field>
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='priority' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Resolved By: </label>
                                    <Field type='text' name='resolvedBy' className='form-control' tabindex='3' placeholder='Resolved By'/>
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='resolvedBy' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Description: </label>
                                    <Field type='text' name='description' className='form-control' tabindex='4' placeholder='Description' />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='description' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Is Resolved?: </label><br />
                                    <Field name="isResolved" as="select" className='form-comtrol' tabindex='5'  placeholder='Is Resolved?'>
                                        <option>Select</option>
                                        <option value={false}>false</option>
                                        <option value={true}>true</option>
                                    </Field>
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='isResolved' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Data of Close: </label>
                                    <Field type='datetime-local' name='dateOfClose' tabindex='6' className='form-control' placeholder='Date Of Close'/>
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='dateOfClose' />
                                    </div>
                                </fieldset>
                                <div>
                                    <button className='btn btn-success m-4' tabindex='7' type='submit'>Submit</button>
                                </div>
                                <div >
                                    <input className='btn btn-primary' type="button" tabindex='8' onClick={GoBack} value='Go Back' />
                                </div>
                            </Form>

                        </Formik>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTicket


// axios.post("http://localhost:8080/reso/tickets", {
//     ticketName,
//     priority,
//     resolvedBy,
//     description,
//     isResolved,
//     dateOfRise,
//     dateOfClose
// }).then((response) => {
//     setTicketName(response.data.ticketName)
//     setPriority(response.data.priority)
//     setResolvedBy(response.data.resolvedBy)
//     setDescription(response.data,description)
//     setIsResolved(response.data.isResolved)
//     setDateOfRise(response.data.dateOfRise)
//     setDateOfClose(response.data.dateOfClose)
// }).catch((err) => {
//     console.log(err);
// });
// alert("Created Successfully")