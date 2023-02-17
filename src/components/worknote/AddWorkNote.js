
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { apiClient } from '../api/AuthenticationApiService';
function AddWorkNote(props) {

    const id = props.id;
    const [workNote, setWorkNote] = useState('')
    const [workTime, setWorkTIme] = useState(null)

    const navigate = useNavigate();
    const NoteValidation = yup.object({
        workNote:yup.string().min(6, 'Work Note Must contains atleast 6 Characters ').required('Work Note is Required')
    })
    const handleSubmit = (e, onSubmitProps) => {
        //e.preventDefault();
        const AddNotes = {
            workNote:e.workNote,
            workTime:e.workTime
        }
        apiClient.post(`/reso/tickets/${id}/work-notes`, AddNotes)
        .then((response) => {
            //console.log(response.data.workNote)
            //navigate(`/read/${id}`)
            
        }).catch((err) => {
            console.log(err)
        });
        //window. location. reload(false)
        var a = window.confirm("Work note is added,\n Do you want to see the work notes")
        if(a){
            navigate(`/read-work-notes/${id}`)
        }
        // window.location.reload(true)
        
    }


    
    return (
        <div>
            <div className="container m-2 border border-danger">
                <h1>Add Work Note</h1>
                <Formik initialValues={{ workNote, workTime }}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                    validationSchema={NoteValidation}
                    // onReset={}
                >
                    <Form className='form'>
                        <fieldset className='form-group'>
                            <label>Work Note: </label>
                            <Field type='text' name='workNote' className='form-control' placeholder='Work Note' />
                            <div style={{color: 'red'}}>
                                <ErrorMessage name='workNote'/>
                            </div>
                        </fieldset>
                        <div>
                            <button className='btn btn-info m-2' type='submit'>Add</button>
                        </div>
                        <div>
                            <button className='btn btn-info m-2' type='reset'>Reset</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddWorkNote

