import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getUserId, authHeader, isLoggedIn } from '../auth'
// import './custom.scss'

// ------------------------------------------------------------- //

export function DashPreferences() {
  const params = useParams()

  const id = params.id

  const [panels, setPanels] = useState([])

  const [dashFormErrorMessage, setDashFormErrorMessage] = useState('')

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
      }
      if (updatedDash.linksPerPanel === 0) {
        updatedDash.linksPerPanel = Number(dash.linksPerPanel)
      }
      updatedDash.linksPerPanel = Number(updatedDash.linksPerPanel)
      const response = await fetch(`/api/Dashes/${dash.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(updatedDash),
      })
      console.log(response.json())
      console.log(updatedDash)
      if (response.ok) {
        getDash()
      }
    } else {
      setDashFormErrorMessage('AUTH ERROR')
    }
  }

  function formatDate(dateAsString) {
    let date = Date.parse(dateAsString + '+04:00')
    // let newOptions = {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // }
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
    setUpdatedDash(newUpdatedDash)
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
        // event.target.className = 'inputContainerClicked'
      }
    } else {
      setPanelFormErrorMessage('AUTH ERROR')
    }
  }

  const [panelFormErrorMessage, setPanelFormErrorMessage] = useState('')

  const [invalidFilterSite, setInvalidFilterSite] = useState(false)

  const [newPanel, setNewPanel] = useState({
    filterSite: '',
    // creationDate: '',
    filterSiteName: '',
    // dashPanelAssignments: [],
  })
  function ifURL(string) {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }
    // return url
    return true
  }

  async function handlePanelFormSubmission(event) {
    event.preventDefault()
    setPanelFormErrorMessage('')
    setInvalidFilterSite(false)
    if (isLoggedIn() && getUserId() === dash.userId) {
      if (ifURL(newPanel.filterSite)) {
        //
        let newPanelUrl = new URL(newPanel.filterSite)
        newPanel.filterSite = newPanelUrl.hostname.replace('www.', '')
        //
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
            console.log(data)
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
      setPanelFormErrorMessage('AUTH ERROR')
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
        console.log(panelAssignmentResponse.json())
        window.location.assign(`/preferences/${dash.id}`)
        // event.target.className
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

  function handleStringPanelFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedPanel = { ...newPanel, [fieldName]: value }

    setNewPanel(updatedPanel)
  }

  useEffect(() => {
    async function getPanels() {
      const panelsResponse = await fetch('/api/Panels')
      // console.log(panelsResponse.json())

      if (panelsResponse.ok) {
        const newPanels = await panelsResponse.json()
        console.log(newPanels)
        setPanels(newPanels)
      }
      // console.log(panels)
    }
    getPanels()
  }, [])

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)
    if (response.ok) {
      const apiData = await response.json()
      setDash(apiData)
      console.log(apiData)
    } else {
      setDashFormErrorMessage('ERROR')
    }
  }
  useEffect(() => {
    getDash()
  }, [id])

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">{dash.name}</h1>
        </Link>{' '}
      </header>
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <h5 className="header">Edit Dash</h5>
          <div className="formContainerCreateAccount">
            <form onSubmit={updateDash} className="formCreateAccount">
              {dashFormErrorMessage ? <p>{dashFormErrorMessage}</p> : null}
              <div className="inputContainer">
                <label htmlFor="name">DashName: </label>
                <input
                  name="name"
                  type="text"
                  value={updatedDash.name}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="linksPerPanel">Results Per Panel: </label>
                <input
                  name="linksPerPanel"
                  type="number"
                  value={updatedDash.linksPerPanel}
                  onChange={handleFieldChange}
                />
              </div>
              <input type="submit" value="Submit" className="submitButton" />
            </form>
            <div className="addPanels">
              {panelFormErrorMessage ? <p>{panelFormErrorMessage}</p> : null}
              <label>Add Panels: </label>
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
                      {panel.filterSiteName}
                    </button>
                  ))}
              </ul>
            </div>
            <form onSubmit={updateDash} className="formCreateAccount">
              <div className="inputContainer">
                <label>Delete Panels: </label>
                <ul className="inputContainer">
                  {dash.dashPanelAssignments.map((dashPanelAssignment) => (
                    <button
                      className="inputContainer"
                      onClick={(event) =>
                        deletePanelAssignment(dashPanelAssignment, event)
                      }
                    >
                      {dashPanelAssignment.rootPanel.filterSiteName}
                    </button>
                  ))}
                </ul>
              </div>
            </form>
            <button
              className="deleteDash"
              onClick={(event) => deleteDash(event)}
            >
              Delete Dash
            </button>
            <div className="containerForCreatingPanel">
              <h5 className="header">Create Panel</h5>
              {panelFormErrorMessage ? <p>{panelFormErrorMessage}</p> : null}
              <div className="formContainerCreateAccount">
                {!invalidFilterSite ? (
                  <form
                    onSubmit={handlePanelFormSubmission}
                    className="formCreateAccount"
                  >
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
                ) : (
                  <form
                    onSubmit={handlePanelFormSubmission}
                    className="formCreateAccount"
                  >
                    <p>Invalid Filter Site. Try Again</p>{' '}
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
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="containerOpenedAndArchived">
          <article className="aboutPageArticle">
            <h5 className="header">Dash Archives</h5>
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
                    <p className="savedLinkList">No Archived Links</p>
                  )}
                </>
              ) : (
                <p className="savedLinkList">Must Login to View Archives</p>
              )}
            </ul>
          </article>
          <article className="aboutPageArticle">
            <h5 className="header">Dash Opened Links</h5>
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
      <footer className="standardFooter">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/create-dash" className="navLink">
          Create Dash
        </Link>
        <Link to="/dash/:id" className="navLink">
          Back to Dash{' '}
        </Link>
      </footer>
    </>
  )
}
