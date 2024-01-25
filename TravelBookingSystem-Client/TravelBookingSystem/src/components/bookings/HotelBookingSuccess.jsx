import React from 'react'
import { useLocation } from 'react-router-dom'

const HoteBookingSuccess = () => {
  const location = useLocation()
  const message = location.state?.message
 const error = location.state?.error
  return (
    <div className="container">
      <div className='mt-5'>
      {message ? (
        <div>
          <h3 className='text-success'>Booking Success!</h3>
          <p className='text-success'>{message}</p>
        </div>
      ): (
        <div>
        <h3 className='text-danger'>Error Booking Room!</h3>
        <p className='text-success'>{error}</p>
      </div>
      )}
      </div>
      
    </div>
  )
}

export default HoteBookingSuccess