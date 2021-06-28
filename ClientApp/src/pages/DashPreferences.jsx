import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getUserId, authHeader, isLoggedIn } from '../auth'
// import './custom.scss'

// ------------------------------------------------------------- //

export function DashPreferences() {
  const params = useParams()

  const id = params.id

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
    const response = await fetch(`/api/SavedLinks/${savedLinkId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.ok) {
      getDash()
    }
  }

  async function updateDash(event) {
    event.preventDefault()
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

    const newUpdatedDash = { ...updatedDash, [fieldName]: value }
    setUpdatedDash(newUpdatedDash)
    console.log(newUpdatedDash)
  }

  async function deleteDash(event) {
    event.preventDefault()
    const response = await fetch(`/api/Dashes/${dash.id}`, {
      method: 'Delete',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })
    if (response.ok) {
      window.location.assign('/')
    }
  }

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)

    if (response.ok) {
      const apiData = await response.json()
      setDash(apiData)
      console.log(apiData)
    }
  }
  useEffect(() => {
    getDash()
  }, [id])

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="altHeader">{dash.name}</h1>
      </Link>
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <h5 className="header">Edit Dash</h5>
          <div className="formContainerCreateAccount">
            <form onSubmit={updateDash} className="formCreateAccount">
              {/* {dashFormErrorMessage ? <p>{dashFormErrorMessage}</p> : null} */}
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
              <input type="submit" value="Submit" />
            </form>
            <button
              className="deleteDash"
              onClick={(event) => deleteDash(event)}
            >
              Delete Dash
            </button>
          </div>
        </div>
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
                            <p className="savedLinkListLabel">Archived At: </p>
                            <p className="savedLinkList">
                              {formatDate(savedLink.timeStamp)}{' '}
                            </p>
                            <p className="savedLinkListLabel">Archived On: </p>
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
                            <p className="savedLinkListLabel">Opened-Link: </p>
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
      </main>
      <footer className="standardFooter">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/dash/:id" className="navLink">
          Back to Dash{' '}
        </Link>
      </footer>
    </>
  )
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// function handleStringFieldChange(event) {
//   const value = event.target.value
//   const fieldName = event.target.name

//   updatedDash = { ...dash, [fieldName]: value }

//   setDash(updatedDash)
// }

// async function handleFormSubmission(event) {
//   event.preventDefault()

//   const response = await fetch('/api/Dashes', {
//     method: 'PUT',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify(updatedDash),
//   })
//   const apiResponse = await response.json()
//   console.log(apiResponse)

//   if (apiResponse.status === 400) {
//     setErrorMessage(Object.values(apiResponse.errors).join(' '))
//   } else {
// window.location.assign.push('/')
//   }
// }
