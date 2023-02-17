import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { string } from 'yup';
import { apiClient } from '../api/AuthenticationApiService';
import { useAuth } from '../security/AuthContext';

function TicketsInterface() {

    const [apiData, setApiData] = useState([]);
    const navigate = useNavigate();

    const authContext = useAuth();
    const role_admin = authContext.role_admin();
    const role_lead = authContext.role_lead();
    function getData() {
        apiClient.get(`/reso/tickets/${authContext.username}/user`).then((response) => {
            setApiData(response.data);
            console.log(response.data);
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        getData();
    }, []);

    function updateTicket(id) {
        console.log(id);
        navigate(`/create/${id}`)
    }
    function deleteTicket(id) {
        var a = window.confirm("Do you want to delete the Ticket with ID: " + id);
        if (a) {
            apiClient.delete(`/reso/tickets/${id}`)
                .then(() => {
                    getData();
                }).catch((err) => {
                    console.log(err);
                });
        }

    }
    function createTicket() {
        navigate(`/create/-1`)
    }
    function readTicket(id) {
        navigate(`/read/${id}`)
    }
    let ticketsStyle = {
        width: "1000px",
        height: "1000px",
        overflow: "auto"
    }
    return (
        <div>
            <div className='container p-5'  id="tickets">
                {(role_admin || role_lead) && <a className='btn btn-info m-4' onClick={createTicket}>Create Ticket</a>}
                {(role_admin || role_lead) && <a className='btn btn-info m-4' onClick={() => navigate('/closed-tickets')}>Closed Ticket</a>}
                <div className="row" style={{overflow:'auto', height:'400px'}}>
                    <table className='table mt-5 table-bordered border-dark table-striped table-hover'>
                        <thead>
                            <tr className='bg-secondary text-light'>
                                <th>Ticket Name</th>
                                <th>Priority</th>
                                <th>Resolved By</th>
                                <th>Description</th>
                                <th>Is Rssolved</th>
                                <th>Date Of Rise</th>
                                <th>Open</th>
                                {(role_admin || role_lead) && <th>Update</th>}
                                {(role_admin) && <th>Delete</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                apiData.map((item) => {
                                    if(item.status=='OPEN'){
                                    return (
                                                <tr key={item.id}>
                                                    <td>{item.ticketName}</td>
                                                    <td>{item.priority}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.dateOfRise.toString()}</td>
                                                    <td><a className='btn btn-primary' onClick={() => readTicket(item.id)}>Go</a></td>
                                                    {(role_admin || role_lead) && <td><a className='btn btn-warning' onClick={() => updateTicket(item.id)}>Update</a></td>}
                                                    {(role_admin) && <td><a className='btn btn-danger' onClick={() => deleteTicket(item.id)}>Delete</a></td>}
                                                </tr>
                                    )
                                    }
                                })
                            }
                        </tbody>
                    </table>


                </div>

            </div>
            
        </div>
    )
}

export default TicketsInterface
