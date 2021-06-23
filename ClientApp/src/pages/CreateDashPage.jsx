import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { authHeader } from '../auth'
// import axios from 'axios'
// import './custom.scss'

// ------------------------------------------------------------- //

export function CreateDashPage() {
  // const history = useHistory()

  const [errorMessage, setErrorMessage] = useState('')

  const [newDashId, setNewDashId] = useState()

  const [newDash, setNewDash] = useState({
    userId: 0,
    creationDate: '',
    dashPanelAssignments: [],
    savedLinks: [],
    name: '',
    linksPerPanel: 0,
  })

  const [newPanel, setNewPanel] = useState({
    filterSite: '',
    creationDate: '',
    filterSiteName: '',
    dashPanelAssignments: [],
  })

  async function postPanel(panelResponseId) {
    const newPanelAssignment = {
      panelId: panelResponseId,
      dashId: newDashId,
    }
    const panelAssignmentResponse = await fetch('/api/PanelAssignments', {
      method: 'POST',
      headers: { 'content-type': 'application/json' }, //...authHeader() },
      body: JSON.stringify(newPanelAssignment),
    })
    console.log(panelAssignmentResponse.json())
  }

  function handleStringDashFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedDash = { ...newDash, [fieldName]: value }

    setNewDash(updatedDash)
  }

  async function handleDashFormSubmission(event) {
    event.preventDefault()

    const response = await fetch('/api/Dashes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newDash),
    })
    if (response.status === 401) {
      setErrorMessage('Not Authorized')
    } else {
      if (response.status === 400) {
        setErrorMessage(Object.values(response.errors).join(' '))
      } else if (response.ok) {
        response.json().then((data) => {
          setNewDashId(data.id)
          console.log(data)
        })
      }
    }
  }

  function handleStringPanelFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedPanel = { ...newPanel, [fieldName]: value }

    setNewPanel(updatedPanel)
  }

  async function handlePanelFormSubmission(event) {
    event.preventDefault()

    const panelResponse = await fetch('/api/Panels', {
      method: 'POST',
      headers: { 'content-type': 'application/json' }, //...authHeader() },
      body: JSON.stringify(newPanel),
    })
    // if (response.status === 401) {
    //   setErrorMessage('Not Authorized')
    // } else {
    if (panelResponse.status === 400) {
      setErrorMessage(Object.values(panelResponse.errors).join(' '))
    } else if (panelResponse.ok) {
      panelResponse.json().then((data) => {
        console.log(data)
        postPanel(data.id)
      })
      setNewPanel({
        FilterSite: '',
        FilterSiteName: '',
      })
    }
  }

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <h5 className="header">Create Dash</h5>
          <div className="formContainerCreateAccount">
            <form
              onSubmit={handleDashFormSubmission}
              className="formCreateAccount"
            >
              {errorMessage ? <p>{errorMessage}</p> : null}
              <div className="inputContainer">
                <label htmlFor="name">DashName: </label>
                <input
                  name="name"
                  type="text"
                  value={newDash.name}
                  onChange={handleStringDashFieldChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="linksPerPanel">Results Per Panel: </label>
                <input
                  name="linksPerPanel"
                  type="text"
                  value={newDash.linksPerPanel}
                  onChange={handleStringDashFieldChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        {!newDashId ? null : (
          <div className="containerForHeaderAndForm">
            <h5 className="header">Create Panels</h5>
            <div className="formContainerCreateAccount">
              <form
                onSubmit={handlePanelFormSubmission}
                className="formCreateAccount"
              >
                {errorMessage ? <p>{errorMessage}</p> : null}
                <div className="inputContainer">
                  <label htmlFor="filterSiteName">Webpage Name: </label>
                  <input
                    name="filterSiteName"
                    type="text"
                    value={newPanel.filterSiteName}
                    onChange={handleStringPanelFieldChange}
                  />
                </div>
                <div className="inputContainer">
                  <label htmlFor="filterSite">Webpage URL: </label>
                  <input
                    name="filterSite"
                    type="text"
                    value={newPanel.filterSite}
                    onChange={handleStringPanelFieldChange}
                  />
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        )}
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
