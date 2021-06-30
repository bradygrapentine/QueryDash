import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { recordAuthentication, isLoggedIn } from '../auth'
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
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">QueryDash</h1>
        </Link>{' '}
      </header>

      <div className="navBar2">
        {isLoggedIn() ? (
          <>
            <ul className="navBar">
              <Link to="/" className="navLink">
                Home
              </Link>
            </ul>
            <form className="filterLinks">
              {' '}
              {/* onSubmit={runDashQuery} */}
              <input
                className="filterDashes"
                type="text"
                placeholder="Filter Links"
                // value={searchTerm}
                // onChange={(event) => {
                //   setSearchTerm(event.target.value)
              />
            </form>
          </>
        ) : (
          <ul className="navBar">
            <Link to="/" className="navLink">
              Home
            </Link>
            <Link to="/create-account" className="navLink">
              Sign Up
            </Link>
          </ul>
        )}
      </div>
      <main className="landingPageContainer">
        <div className="listOfDashes">
          <h5 className="HeaderDashList2">Login</h5>
          <div className="DisplayListDash">
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
              <input type="submit" value="Submit" className="submit" />
            </form>
          </div>
        </div>
      </main>
      <footer className="standardFooter2">
        <Link to="/about" className="navLink">
          About
        </Link>
      </footer>
    </>
  )
}
