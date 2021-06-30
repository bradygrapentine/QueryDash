import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { authHeader } from '../auth'
// import axios from 'axios'
// import './custom.scss'

// ------------------------------------------------------------- //

export function CreateDashPage() {
  // const history = useHistory()

  const [dashFormErrorMessage, setDashFormErrorMessage] = useState('')
  const [panelFormErrorMessage, setPanelFormErrorMessage] = useState('')
  const [addPanelFormErrorMessage, setAddPanelFormErrorMessage] = useState('')

  const [invalidFilterSite, setInvalidFilterSite] = useState(false)

  const [newDashId, setNewDashId] = useState()

  const [panels, setPanels] = useState([])

  const [addedPanelIds, setAddedPanelIds] = useState([])

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
    // creationDate: '',
    filterSiteName: '',
    // dashPanelAssignments: [],
  })

  // https://stackoverflow.com/users/1092711/pavlo
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url?answertab=votes#tab-top
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

  const [panelAssignmentCounter, setPanelAssignmentCounter] = useState(0)

  async function postPanelAssignment(panelResponseId) {
    setPanelAssignmentCounter(panelAssignmentCounter + 1)
    const newPanelAssignment = {
      panelId: panelResponseId,
      dashId: newDashId,
    }
    const panelAssignmentResponse = await fetch('/api/PanelAssignments', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newPanelAssignment),
    })
    if (panelAssignmentResponse.ok) {
      panelAssignmentResponse.json().then((data) => {
        setAddedPanelIds([...addedPanelIds, data.panelId])
        console.log(data)
      })
      // console.log(panelAssignmentResponse.json())
    }
  }

  function handleStringDashFieldChange(event) {
    setDashFormErrorMessage('')
    const value = event.target.value
    const fieldName = event.target.name
    const updatedDash = { ...newDash, [fieldName]: value }
    if (updatedDash.linksPerPanel > 30) {
      updatedDash.linksPerPanel = 30
      setDashFormErrorMessage('Results per panel cannot exceed 30')
    }
    setNewDash(updatedDash)
  }

  async function handleDashFormSubmission(event) {
    event.preventDefault()
    setDashFormErrorMessage('')
    const response = await fetch('/api/Dashes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newDash),
    })
    if (response.status === 401) {
      setDashFormErrorMessage('Not Authorized')
    } else {
      if (response.status === 400) {
        setDashFormErrorMessage(Object.values(response.errors).join(' '))
      } else if (response.ok) {
        response.json().then((data) => {
          setNewDashId(data.id)
          console.log(data)
        })
      }
    }
  }

  function handleStringPanelFieldChange(event) {
    setPanelFormErrorMessage('')
    const value = event.target.value
    const fieldName = event.target.name

    const updatedPanel = { ...newPanel, [fieldName]: value }

    setNewPanel(updatedPanel)
  }

  async function handlePanelFormSubmission(event) {
    event.preventDefault()
    setPanelFormErrorMessage('')
    setInvalidFilterSite(false)
    setAddPanelFormErrorMessage('')
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
        setPanelFormErrorMessage(Object.values(panelResponse.errors).join(' '))
      } else if (panelResponse.ok) {
        panelResponse.json().then((data) => {
          console.log(data)
          postPanelAssignment(data.id)
        })
        setInvalidFilterSite(false)
        setPanelFormErrorMessage(
          `Panel Created and Added to ${newDash.name}. ${
            10 - (panelAssignmentCounter + 1)
          } assignments left.`
        )
      }
    } else {
      setInvalidFilterSite(true)
    }
    setNewPanel({
      filterSite: '',
      filterSiteName: '',
    })
  }

  async function handleExistingPanelSelection(existingPanel) {
    postPanelAssignment(existingPanel.value)
    existingPanel.className = 'notVisible'
    setAddPanelFormErrorMessage(
      `Panel Added to ${newDash.name}. ${
        10 - (panelAssignmentCounter + 1)
      } assignments left.`
    )
    setPanelFormErrorMessage('')
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

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">QueryDash</h1>
        </Link>{' '}
      </header>
      <main className="createDashPage">
        <div className="listOfDashes">
          <h5 className="HeaderDashList2">Create Dash</h5>
          <div className="DisplayListDash">
            <form
              onSubmit={handleDashFormSubmission}
              className="formCreateAccount"
            >
              {dashFormErrorMessage ? <p>{dashFormErrorMessage}</p> : null}
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
                  type="number"
                  value={newDash.linksPerPanel}
                  onChange={handleStringDashFieldChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        {!newDashId || panelAssignmentCounter === 10 ? (
          <>{!newDashId ? null : <p> Panel Assignment Limit Reached </p>}</>
        ) : (
          <>
            <div className="listOfDashes3">
              <h5 className="HeaderDashList2">Add Panels</h5>
              {addPanelFormErrorMessage ? (
                <p>{addPanelFormErrorMessage}</p>
              ) : null}
              <ul>
                {panels
                  .filter((panel) => !addedPanelIds.includes(panel.id))
                  .map((panel) => (
                    <button
                      className="visible"
                      value={panel.id}
                      onClick={(event) =>
                        handleExistingPanelSelection(event.target)
                      }
                    >
                      {' '}
                      {panel.filterSiteName}{' '}
                    </button>
                  ))}
              </ul>{' '}
            </div>
            <div className="listOfDashes">
              <h5 className="HeaderDashList2">Create Panel</h5>
              {panelFormErrorMessage ? <p>{panelFormErrorMessage}</p> : null}
              {invalidFilterSite ? <p>Invalid Filter Site. Try Again</p> : null}
              <div className="DisplayListDash2">
                {!invalidFilterSite ? (
                  <form
                    onSubmit={handlePanelFormSubmission}
                    className="formCreateAccount2"
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
          </>
        )}
      </main>
      <footer className="standardFooter2">
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
