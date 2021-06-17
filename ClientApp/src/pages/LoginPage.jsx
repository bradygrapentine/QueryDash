import React from 'react'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

// might just make this a dropdown on landing page

export function LoginPage() {
  return (
    <Link className="linkForHeader" to="/">
      <h1 className="header">QueryDash</h1>
    </Link>
  )
}
