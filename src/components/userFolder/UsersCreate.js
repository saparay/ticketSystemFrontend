import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { apiClient } from '../api/AuthenticationApiService';
import { useAuth } from '../security/AuthContext';

function UsersCreate() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const authContext = useAuth();
    const role_admin = authContext.role_admin();
    const role_lead = authContext.role_lead();

    const handleSubmit = (e) => {
        const user= {
            name:e.name,
            username:e.username,
            email:e.email,
            password:e.password,
            role:e.role
        }
        apiClient.post(`/auth/register`, user)
        .then((response) => {
            //console.log(response)
            window.alert('User is created')
            navigate(`/read-user`)
        }).catch((err) => {
            console.log(err);
            
        });
    }
    const FormValidations = yup.object({
        name: yup.string().required('Name Is Must'),
        username: yup.string().required('username Is Must'),
        email: yup.string().required('email By Is Must'),
        password: yup.string().required('password Is Must'),
        role: yup.string().required('role is must'),
    })
    return (
        <div>
            <div className="contaier p-5">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Create User</h3>
                        <Formik
                            initialValues={{name, username, email, password, role}}
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                            validationSchema={FormValidations}
                        >
                            <Form className='form'>
                                <fieldset className='form-group'>
                                    <label className="form-label">Full Name</label>
                                    <Field type='text' name='name' placeholder='Full Name' autofocus="autofocus" tabindex='1' className='form-control' />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='name' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label className="form-label">Username</label>
                                    <Field type='text' name='username' placeholder='Username' tabindex='2' className='form-control' />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='username' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label className="form-label">Email</label>
                                    <Field type='eamil' name='email' placeholder='example@email.com' tabindex='3' className='form-control' />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='email' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label className="form-label">Password</label>
                                    <Field type='password' name='password' placeholder='**********' tabindex='4' className='form-control' />
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='password' />
                                    </div>
                                </fieldset>
                                <fieldset className='form-group m-3'>
                                    <label className="form-label">Role</label><br />
                                    <Field as='select' name='role' className='form-control' tabindex='5' >
                                        <option>Select</option>
                                        {role_admin && <option value="ROLE_ADMIN">Admin</option>}
                                        <option value="ROLE_LEAD">Lead</option>
                                        <option value="ROLE_MEMBER">Member</option>
                                    </Field>
                                    <div style={{ color: 'red' }}>
                                        <ErrorMessage name='role' />
                                    </div>
                                </fieldset>
                                <div>
                                    <button className='btn btn-success m-4' type='submit' tabindex='6'>Submit</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersCreate
