import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

export function CreateDashPage() {
  const history = useHistory()

  const [errorMessage, setErrorMessage] = useState()

  const [newSharedDash, setNewSharedDash] = useState({
    dashName: '',
    isPreset: true,
    presetPublicationDate: '2021-01-01 00:02:00',
    linksPerPanel: 0,
  })

  // const [panels, setPanels] = useState({
  //   SiteFilter: '',
  //   FilterSiteName: '',
  // })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedDash = { ...newSharedDash, [fieldName]: value }

    setNewSharedDash(updatedDash)
  }

  async function handleFormSubmission(event) {
    event.preventDefault()

    const response = await fetch('/api/Dashes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newSharedDash),
    })
    const apiResponse = await response.json()
    console.log(apiResponse)

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      // history.push('/')
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
                <label htmlFor="dashName">DashName: </label>
                <input
                  name="dashName"
                  type="text"
                  value={newSharedDash.dashName}
                  onChange={handleStringFieldChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="linksPerPanel">Links/Panel: </label>
                <input
                  name="linksPerPanel"
                  type="text"
                  value={newSharedDash.linksPerPanel}
                  onChange={handleStringFieldChange}
                />
              </div>
              {/* <div className="inputContainer">
                <label htmlFor="password">Password: </label>
                <input
                  name="password"
                  type="password"
                  value={newSharedDash.password}
                  onChange={handleStringFieldChange}
                />
              </div> */}
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
        {/* <a href="https://www.google.com/" className="footer">
        Contact
      </a> */}
      </footer>
    </>
  )
}
