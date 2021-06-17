import React from 'react'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

// probably just a drop down on Dash pages and Account page for more general styling

export function DashPreferences() {
  return (
    <Link className="linkForHeader" to="/">
      <h1 className="header">QueryDash</h1>
    </Link>
  )
}
