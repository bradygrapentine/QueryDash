import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { recordAuthentication } from '../auth'
// import './custom.scss'

// ------------------------------------------------------------- //

// might just make this a dropdown on landing page

export function LoginPage() {
  const [errorMessage, setErrorMessage] = useState()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
    console.log(user)
  }

  async function handleFormSubmission(event) {
    event.preventDefault()

    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })

    const apiResponse = await response.json()
    console.log(apiResponse)
    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      recordAuthentication(apiResponse)
      window.location.assign('/')
    }
  }
  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form onSubmit={handleFormSubmission} className="formCreateAccount">
              {errorMessage ? <p>{errorMessage}</p> : null}
              <div className="inputContainer">
                <label htmlFor="createAccount">Email Address: </label>
                <input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleStringFieldChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="password">Password: </label>
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleStringFieldChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/about" className="navLink">
          About
        </Link>
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/create-dash" className="navLink">
          Create Dash{' '}
        </Link>
      </footer>
    </>
  )
}
