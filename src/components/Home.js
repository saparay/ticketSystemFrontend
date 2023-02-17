import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import { ErrorMessage, Field, Form, Formik } from 'formik'
function Home() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Carousel fade variant='light'>
            <Carousel.Item interval={1000}>
              <img src='Images/ts1.jpg'
                className='d-block w-100'
                height='400' width='1000' />
              <Carousel.Caption>
                <h4>First Image</h4>
                <p>Description of first image</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img src='Images/ts2.jpg'
                className='d-block w-100'
                height='400' width='1000' />
              <Carousel.Caption>
                <h4>Second Image</h4>
                <p>Description of second image</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img src='Images/ts3.jpg'
                className='d-block w-100'
                height='400' width='1000' />
              <Carousel.Caption>
                <h4>Third Image</h4>
                <p>Description of third image</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row>
        <div className="container ">
          <div className="row">
            <div className="col-md-6 m-4 bg-info p-4 rounded-5">
              <h3>We Need Your Feedbacks To Improve</h3>
              <hr />
              <Formik>
                <Form className='form mt-5 mb-5'>
                  <fieldset className='form-group'>
                    <label className="form-label">Full Name: </label>
                    <Field type='text' name='fullName' className='form-control' placeholder='Full Name' />
                    <div style={{ color: 'red' }}>
                      <ErrorMessage name='fullName' />
                    </div>
                  </fieldset>
                  <fieldset className='form-group'>
                    <label>Email: </label>
                    <Field type='email' name='email' className='form-control' placeholder='Email' />
                    <div style={{ color: 'red' }}>
                      <ErrorMessage name='email' />
                    </div>
                  </fieldset>
                  <fieldset className='form-group'>
                    <label>Country: </label>
                    <Field type='text' name='country' className='form-control' placeholder='Country' />
                    <div style={{ color: 'red' }}>
                      <ErrorMessage name='country' />
                    </div>
                  </fieldset>
                  <fieldset className='form-group'>
                    <label>Description: </label>
                    <Field type='text' name='description' className='form-control' placeholder='Description' />
                    <div style={{ color: 'red' }}>
                      <ErrorMessage name='description' />
                    </div>
                  </fieldset>
                  <fieldset className='form-group m-3'>
                    <label>Rate Us:  </label><br />
                    <Field name="rate" as="select" className='form-comtrol' placeholder='Rate'>
                      <option>Select</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Field>
                    <div style={{ color: 'red' }}>
                      <ErrorMessage name='rate' />
                    </div>
                  </fieldset>
                  <div>
                    <button className='btn btn-success m-4' type='submit'>Submit</button>
                  </div>
                  <div >
                    {/* <input className='btn btn-primary' type="button" onClick={GoBack} value='Go Back' /> */}
                  </div>
                </Form>

              </Formik>

            </div>
            <div className="col-5 mt-4 mb-4 p-4 bg-success rounded-5">
            <h4>Ticket </h4>
                <img src='Images/ts2.jpg' className='rounded-5' width='500px' height='400px'/>
                <details className='bg-primary mt-2 rounded-5'>
                  <summary>Lorem ipsum dolor</summary>
                  <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
                  ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis 
                  parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec 
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, 
                  rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede 
                  mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. 
                  Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat 
                  vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat 
                  a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. 
                  Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper 
                  ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget 
                  condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque 
                  sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. 
                  Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero 
                  venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus 
                  tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis 
                  magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>
                </details>
                <p className='text-light'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo 
                  ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis 
                  parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec 
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
            </div>
          </div>

        </div>
      </Row>
    </Container>
  )
}

export default Home
