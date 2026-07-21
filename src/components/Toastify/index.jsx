'use client'

import { ToastContainer } from 'react-toastify'

const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default Toastify
