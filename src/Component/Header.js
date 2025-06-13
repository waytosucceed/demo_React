import React from 'react'
import Logo from './../assets/Logo.png'
import HeaderLogo from './../assets/header.png'

function Header () {
  return (
    <div
      style={{
        width: 'auto',
        boxShadow: '5px 5px 10px rgb(0, 0, 0)',
        paddingBottom: '10px'
      }}
    >
      <img
        src={Logo}
        width='5%'
        style={{ float: 'left', marginTop: '25px', textAlign: 'left' }}
        alt='Logo'
      />
      <span>
        <img
          src={HeaderLogo}
          width='30%'
          style={{ textAlign: 'left' }}
          alt='Header'
        />
      </span>
    </div>
  )
}

export default Header
