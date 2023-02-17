import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/AuthenticationApiService';

function ReadUsers() {


    const navigate = useNavigate();
    const [apiData, setApiData] = useState([])

    const retriveUsers = () => {
        apiClient.get(`/auth/register`)
            .then((response) => {
                setApiData(response.data)
            }).catch((err) => {
                console.log(err);
            });
    }
    const deleteUser = (id) => {
        var a = window.confirm("Do you want to delete the User With ID: " + id);
        if (a) {
            apiClient.delete(`/auth/register/${id}`)
                .then((response) => {
                    retriveUsers();
                }).catch((err) => {
                    console.log(err);
                });
        }

    }
    useEffect(() => {
        retriveUsers();
    }, [])
    return (
        <div>
            <div className="container p-5 rounded-5 mt-5">
                <h1>Users Details: </h1>
                <div className='mb-2'>
                    <button type='button' className='btn btn-primary' onClick={() => navigate('/create-user')}>Create</button>
                </div>
                <table className='table table-bordered border-dark table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            apiData.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.fullName}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>
                                        <td>{item.roles}</td>
                                        <td><a className='btn btn-danger' onClick={() => deleteUser(item.id)}>Delete</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ReadUsers
