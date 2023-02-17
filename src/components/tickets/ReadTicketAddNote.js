import axios, { toFormData } from 'axios'
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/AuthenticationApiService';
import AddWorkNote from '../worknote/AddWorkNote';
import ReadWorkNotes from '../worknote/ReadWorkNotes';

function ReadTicketAddNote() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [apiData, setApiData] = useState([])

    function retriveTicket() {
        apiClient.get(`/reso/tickets/${id}`)
            .then((response) => {
                setApiData(response.data)
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(
        () => retriveTicket(), [id]
    )
    const GoBack = () => {
        navigate('/tickets')
    }

    const readTicketNotes = (id) => {
        navigate(`/read-work-notes/${id}`)
    }
    return (
        <div >
            <div className="container mt-5 border border-info " id='tickets'>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Ticket Details</h2>
                        <table className='table table-responsive table-striped border'>
                            <tbody>
                                <tr>
                                    <th>Ticket Id</th>
                                    <td>{apiData.id}</td>
                                </tr>
                                <tr>
                                    <th>Tikcet Name</th>
                                    <td>{apiData.ticketName}</td>
                                </tr>
                                <tr>
                                    <th>Priority</th>
                                    <td>{apiData.priority}</td>
                                </tr>
                                <tr>
                                    <th>Resolved By</th>
                                    <td>{apiData.resolvedBy}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{apiData.description}</td>
                                </tr>
                                <tr>
                                    <th>Is Resolved ?</th>
                                    <td>{String(apiData.isResolved)}</td>
                                </tr>
                                <tr>
                                    <th>Date of Rise</th>
                                    <td>{apiData.dateOfRise}</td>
                                </tr>
                                <tr>
                                    <th>Date of Close</th>
                                    <td>{apiData.dateOfClose}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div >
                            <input className='btn btn-primary mb-3' type="button" onClick={GoBack} value='Go Back' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        {/* <ReadWorkNotes id={id} /> */}
                        <AddWorkNote id={id} />
                        <div className='mt-5'>
                            <h4>Read the Work note of Ticket {apiData.id}</h4>
                            <a className='btn btn-primary' onClick={() => readTicketNotes(apiData.id)}>Read Work Notes</a>
                        </div> 
                    </div>

                </div>
            </div>
            <script>
                
            </script>
        </div>
    )
}

export default ReadTicketAddNote
