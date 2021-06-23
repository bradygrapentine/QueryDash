import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { authHeader } from '../auth'
// import './custom.scss'

// ------------------------------------------------------------- //

export function CreateDashPage() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState('')

  const [newDash, setNewDash] = useState({
    name: '',
    userId: 1,
    linksPerPanel: 0,
  })

  // const [panels, setPanels] = useState({
  //   SiteFilter: '',
  //   FilterSiteName: '',
  // })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedDash = { ...newDash, [fieldName]: value }

    setNewDash(updatedDash)
  }

  async function handleFormSubmission(event) {
    event.preventDefault()

    const response = await fetch('/api/Dashes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' }, //...authHeader() },
      body: JSON.stringify(newDash),
    })
    // if (response.status === 401) {
    //   setErrorMessage('Not Authorized')
    // } else {
    if (response.status === 400) {
      setErrorMessage(Object.values(response.errors).join(' '))
    } else {
      console.log(response)
      history.push('/')
    }
    // }
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
                <label htmlFor="name">DashName: </label>
                <input
                  name="name"
                  type="text"
                  value={newDash.name}
                  onChange={handleStringFieldChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="linksPerPanel">Results Per Panel: </label>
                <input
                  name="linksPerPanel"
                  type="number"
                  value={newDash.linksPerPanel}
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
      </footer>
    </>
  )
}
