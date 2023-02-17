import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/AuthenticationApiService';

function ReadWorkNotes(props) {

    const [workNoteApiData, setWorkNoteApiData] = useState([])
    const {id} = useParams();

    const navigate = useNavigate();
    function retriveTicketNote() {
        apiClient.get(`/reso/tickets/${id}/work-notes`)
            .then((response) => {
                setWorkNoteApiData(response.data)
            }).catch((err) => {
                console.log(err);
            });
    }
    useEffect(
        () => retriveTicketNote(), []
    )
    const GoBack = (id) =>{
        navigate(`/read/${id}`)
    }
    return (
        <div className='container mt-3 border border-dark'>
            <h1>Work Notes</h1>
            <div style={{overflow:'auto', height:'400px'}}>
            <table className='table table-striped border' >
                <thead>
                    <tr>
                        <th>Work Note</th>
                        <th>Work Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        workNoteApiData.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.workNote}</td>
                                    <td>{item.workTime}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            
            <div>
            <a className='btn btn-primary mb-3' onClick={() => GoBack(id) }>Go Back</a>
            </div>
        </div>
    )
}

export default ReadWorkNotes
