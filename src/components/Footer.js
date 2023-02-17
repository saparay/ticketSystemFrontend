import React from 'react'

function Footer() {
  return (
    <div>
      <div className='container-fluid bg-light text-dark'>
      <h4><code style={{fontSize:'40px', fontFamily:'cooper'}}>#mARS &#9889;</code> &#169;Copy rights 2023</h4>
        <div className="row">
            <div className="col-6">
                <h6>Social Media</h6>
                <code className='text-primary'>Facebook</code><br />
                <code>Instagram</code><br />
                <code className='text-info'>Twitter</code><br />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
