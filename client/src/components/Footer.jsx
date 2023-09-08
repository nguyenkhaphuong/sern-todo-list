import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className='bg-slate-600 p-5 sticky'>
      <div className='md:flex md:items-center py-2 md:justify-between'>
        <span className='text-sm text-white sm:text-center'>
          © {date}
          <span className='ml-1'>Nguyen Kha Phuong</span>. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
