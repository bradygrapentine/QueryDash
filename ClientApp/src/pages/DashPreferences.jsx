import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserId, authHeader, isLoggedIn, logout } from '../auth'

// ------------------------------------------------------------- //

export function DashPreferences() {
  const params = useParams()

  const id = params.id

  const [panels, setPanels] = useState([])

  const [dashFormErrorMessage, setDashFormErrorMessage] = useState('')

  const [panelFormErrorMessage, setPanelFormErrorMessage] = useState('')

  const [invalidFilterSite, setInvalidFilterSite] = useState(false)

  const [dash, setDash] = useState({
    id: 0,
    userId: 0,
    creationDate: '',
    name: '',
    dashPanelAssignments: [],
    savedLinks: [],
    linksPerPanel: 0,
  })

  const [updatedDash, setUpdatedDash] = useState({
    id: 0,
    userId: 0,
    creationDate: '',
    name: '',
    dashPanelAssignments: [],
    linksPerPanel: 0,
    savedLinks: [],
  })

  const [newPanel, setNewPanel] = useState({
    filterSite: '',
    filterSiteName: '',
  })
  function ifURL(string) {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }
    return true
  }

  function handleStringPanelFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedPanel = { ...newPanel, [fieldName]: value }

    setNewPanel(updatedPanel)
  }

  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  function formatDate(dateAsString) {
    let date = Date.parse(dateAsString + '+04:00')
    let formattedDate = Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date)
    return formattedDate
  }

  function handleFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    setDashFormErrorMessage('')

    const newUpdatedDash = { ...updatedDash, [fieldName]: value }
    if (newUpdatedDash.linksPerPanel > 30) {
      newUpdatedDash.linksPerPanel = 30
      setDashFormErrorMessage('Results per panel cannot exceed 30')
    }
    if (newUpdatedDash.name.length > 20) {
      newUpdatedDash.name = updatedDash.name.slice(0, 20)
      setDashFormErrorMessage('Characters per name cannot exceed 20')
    }
    setUpdatedDash(newUpdatedDash)
  }

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)
    if (response.ok) {
      const apiData = await response.json()
      setDash(apiData)
    } else {
      setDashFormErrorMessage('ERROR')
    }
  }

  async function updateDash(event) {
    event.preventDefault()
    if (isLoggedIn() && getUserId() === dash.userId) {
      updatedDash.id = dash.id
      updatedDash.dashPanelAssignments = dash.dashPanelAssignments
      updatedDash.savedLinks = dash.savedLinks
      updatedDash.creationDate = dash.creationDate
      updatedDash.userId = dash.userId
      if (updatedDash.name === '') {
        updatedDash.name = dash.name
        setDashFormErrorMessage('Links Per Panel Updated')
      }
      if (updatedDash.linksPerPanel === 0) {
        updatedDash.linksPerPanel = Number(dash.linksPerPanel)
        setDashFormErrorMessage('Dash Renamed')
      }
      updatedDash.linksPerPanel = Number(updatedDash.linksPerPanel)
      const response = await fetch(`/api/Dashes/${dash.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(updatedDash),
      })
      if (response.ok) {
        getDash()
      }
    } else {
      setDashFormErrorMessage('AUTH ERROR')
    }
  }

  async function handlePanelFormSubmission(event) {
    event.preventDefault()
    setPanelFormErrorMessage('')
    setInvalidFilterSite(false)
    if (
      isLoggedIn() &&
      getUserId() === dash.userId &&
      dash.dashPanelAssignments.length < 10
    ) {
      if (ifURL(newPanel.filterSite)) {
        let newPanelUrl = new URL(newPanel.filterSite)
        newPanel.filterSite = newPanelUrl.hostname.replace('www.', '')
        const panelResponse = await fetch('/api/Panels', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newPanel),
        })
        if (panelResponse.status === 400) {
          setPanelFormErrorMessage(
            Object.values(panelResponse.errors).join(' ')
          )
        } else if (panelResponse.ok) {
          panelResponse.json().then((data) => {
            postPanelAssignment(data, event)
          })
          setInvalidFilterSite(false)
          setPanelFormErrorMessage('Panel Created and Assigned')
        }
      } else {
        setInvalidFilterSite(true)
      }
      setNewPanel({
        filterSite: '',
        filterSiteName: '',
      })
    } else {
      setPanelFormErrorMessage('Panel Assignment Limit Reached')
    }
  }

  async function postPanelAssignment(panel, event) {
    if (isLoggedIn() && getUserId() === dash.userId) {
      if (dash.dashPanelAssignments.length > 9) {
        setPanelFormErrorMessage('Panel Assignment Limit Reached')
      } else {
        event.preventDefault()

        const newPanelAssignment = {
          panelId: panel.id,
          dashId: dash.id,
        }
        const panelAssignmentResponse = await fetch('/api/PanelAssignments', {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...authHeader() },
          body: JSON.stringify(newPanelAssignment),
        })
        window.location.assign(`/preferences/${dash.id}`)
      }
    } else {
      setPanelFormErrorMessage('AUTH ERROR')
    }
  }

  async function deleteDash(event) {
    if (isLoggedIn() && getUserId() === dash.userId) {
      event.preventDefault()
      const response = await fetch(`/api/Dashes/${dash.id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', ...authHeader() },
      })
      if (response.ok) {
        window.location.assign('/')
      }
    } else {
      setDashFormErrorMessage('AUTH ERROR')
    }
  }

  async function deletePanelAssignment(dashPanelAssignment, event) {
    if (isLoggedIn() && getUserId() === dash.userId) {
      event.preventDefault()
      const response = await fetch(
        `/api/PanelAssignments/${dashPanelAssignment.id}`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...authHeader() },
        }
      )
      if (response.ok) {
        window.location.assign(`/preferences/${dash.id}`)
      }
    } else {
      setPanelFormErrorMessage('AUTH ERROR')
    }
  }

  async function deleteSavedLink(savedLinkId) {
    if (isLoggedIn() && getUserId() === dash.userId) {
      const response = await fetch(`/api/SavedLinks/${savedLinkId}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', ...authHeader() },
      })

      if (response.ok) {
        getDash()
      }
    } else {
      setDashFormErrorMessage('AUTH ERROR')
    }
  }

  useEffect(() => {
    async function getPanels() {
      const panelsResponse = await fetch('/api/Panels')
      if (panelsResponse.ok) {
        const newPanels = await panelsResponse.json()
        setPanels(newPanels)
      }
    }
    getPanels()
  }, [])

  useEffect(() => {
    getDash()
  }, [id])

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">Edit {dash.name}</h1>
        </Link>{' '}
      </header>
      <div className="navBar2">
        {isLoggedIn() ? (
          <>
            <ul className="navBar">
              <Link to="/" className="navLink">
                Home
              </Link>
              <Link to={`/dash/${dash.id}`} className="navLink">
                Use Dash{' '}
              </Link>
              <Link to="/create-dash" className="navLink">
                Create Dash
              </Link>
              <Link to="/historyandarchives" className="navLink">
                Browse Later
              </Link>
            </ul>
            <span className="navLink" onClick={handleLogout}>
              Log Out
            </span>
          </>
        ) : (
          <ul className="navBar">
            <Link to="/" className="navLink">
              Home
            </Link>
            <Link to="/create-account" className="navLink">
              Sign Up
            </Link>
            <Link to="/login" className="navLink">
              Log in
            </Link>
          </ul>
        )}
      </div>
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <div className="formContainerCreateAccount">
            <form onSubmit={updateDash} className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="name">New Dash Name (0-20 Characters): </label>
                <input
                  name="name"
                  type="text"
                  value={updatedDash.name}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="linksPerPanel">
                  New Results Per Panel (Current: {dash.linksPerPanel}):{' '}
                </label>
                <input
                  name="linksPerPanel"
                  type="number"
                  value={updatedDash.linksPerPanel}
                  onChange={handleFieldChange}
                />
              </div>
              <input type="submit" value="Submit" className="submitButton" />
              {dashFormErrorMessage ? <p>{dashFormErrorMessage}</p> : null}
            </form>
            <div className="addPanels">
              <label>Add Panels to {dash.name}: </label>
              <ul className="inputContainer">
                {panels
                  .filter(
                    (panel) =>
                      !dash.dashPanelAssignments
                        .map(
                          (dashPanelAssignment) => dashPanelAssignment.panelId
                        )
                        .includes(panel.id)
                  )
                  .map((panel) => (
                    <button
                      className="inputContainer"
                      onClick={(event) => postPanelAssignment(panel, event)}
                    >
                      {panel.filterSiteName} - {panel.filterSite}
                    </button>
                  ))}
              </ul>
              {panelFormErrorMessage ? <p>{panelFormErrorMessage}</p> : null}
            </div>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="deletePanels"
            >
              <div className="addPanels">
                <label>Delete Panels from {dash.name}: </label>
                <ul className="inputContainer">
                  {dash.dashPanelAssignments.map((dashPanelAssignment) => (
                    <button
                      className="inputContainer"
                      onClick={(event) =>
                        deletePanelAssignment(dashPanelAssignment, event)
                      }
                    >
                      <>{dashPanelAssignment.rootPanel.filterSiteName} - </>
                      {dashPanelAssignment.rootPanel.filterSite}
                    </button>
                  ))}
                </ul>
              </div>
            </form>

            <div className="containerForCreatingPanel">
              <form
                onSubmit={handlePanelFormSubmission}
                className="formCreateAccount"
              >
                <h5 className="header2">Create New Panel</h5>
                {!invalidFilterSite ? null : (
                  <p>Invalid Filter Site. Try Again</p>
                )}
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
                <input className="submitButton" type="submit" value="Submit" />
                {panelFormErrorMessage ? <p>{panelFormErrorMessage}</p> : null}
              </form>
            </div>
            <div className="deleteDash">
              <button
                className="deleteDash"
                onClick={(event) => deleteDash(event)}
              >
                Delete {dash.name}
              </button>
            </div>
          </div>
        </div>
        <div className="containerOpenedAndArchived">
          <article className="aboutPageArticle">
            <h5 className="header">{dash.name} Archives</h5>
            <ul className="savedLinkList">
              {isLoggedIn() ? (
                <>
                  {dash.savedLinks.filter(
                    (savedLink) => savedLink.isArchive === true
                  ).length > 0 ? (
                    <>
                      {dash.savedLinks
                        .filter((savedLink) => savedLink.isArchive === true)
                        .map((savedLink) => (
                          <>
                            <li className="savedLinkList">
                              <p className="savedLinkListLabel">
                                Archived-Link:{' '}
                              </p>
                              <a
                                className="savedLinkList"
                                href={savedLink.queryUrl}
                              >
                                {savedLink.queryUrl}
                              </a>
                              <p className="savedLinkListLabel">
                                Archived At:{' '}
                              </p>
                              <p className="savedLinkList">
                                {formatDate(savedLink.timeStamp)}{' '}
                              </p>
                              <p className="savedLinkListLabel">
                                Archived On:{' '}
                              </p>
                              <p className="savedLinkList">{dash.name} </p>
                            </li>
                            <button
                              className="savedLinkList"
                              onClick={() => deleteSavedLink(savedLink.id)}
                            >
                              Delete
                            </button>
                          </>
                        ))}
                    </>
                  ) : (
                    <p className="savedLinkListLabel">No Archived Links</p>
                  )}
                </>
              ) : (
                <p className="savedLinkListLabel">
                  Must Login to View Archives
                </p>
              )}
            </ul>
          </article>
          <article className="aboutPageArticle">
            <h5 className="header">{dash.name} Opened Links</h5>
            <ul className="savedLinkList">
              {isLoggedIn() ? (
                <>
                  {dash.savedLinks.filter(
                    (savedLink) => savedLink.isArchive === false
                  ).length > 0 ? (
                    <>
                      {dash.savedLinks
                        .filter((savedLink) => savedLink.isArchive === false)
                        .map((savedLink) => (
                          <>
                            <li className="savedLinkList">
                              <p className="savedLinkListLabel">
                                Opened-Link:{' '}
                              </p>
                              <a
                                className="savedLinkList"
                                href={savedLink.queryUrl}
                              >
                                {savedLink.queryUrl}
                              </a>
                              <p className="savedLinkListLabel">Opened At: </p>
                              <p className="savedLinkList">
                                {formatDate(savedLink.timeStamp)}{' '}
                              </p>
                              <p className="savedLinkListLabel">Opened On: </p>
                              <p className="savedLinkList">{dash.name} </p>
                            </li>
                            <button
                              className="savedLinkList"
                              onClick={() => deleteSavedLink(savedLink.id)}
                            >
                              Delete
                            </button>
                          </>
                        ))}
                    </>
                  ) : (
                    <p className="savedLinkList">No Archived Links</p>
                  )}
                </>
              ) : (
                <p className="savedLinkList">Must Login to View Archives</p>
              )}
            </ul>
          </article>
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
