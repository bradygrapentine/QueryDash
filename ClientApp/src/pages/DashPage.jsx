import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserId, authHeader, isLoggedIn } from '../auth'
import ls from 'local-storage'
// import { isWebUri } from 'valid-url'

// ------------------------------------------------------------- //

export function DashPage() {
  const [menuOpen, setMenuOpen] = useState(true)

  const [dash, setDash] = useState({
    creationDate: '',
    name: '',
    dashPanelAssignments: [],
    savedLinks: [],
    linksPerPanel: 0,
  })

  let lastSearchResults = localStorage.getItem(`searchResults${dash.id}`) || []
  let lastSearchTerm = localStorage.getItem(`searchTerm${dash.id}`) || ''

  const [searchResults, setSearchResults] = useState([])

  const [waitingForSearchResults, setWaitingForSearchResults] = useState(false)

  const params = useParams()
  const [searchTerm, setSearchTerm] = useState('')

  const id = params.id

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)

    if (response.ok) {
      const apiData = await response.json()
      setDash(apiData)
    }
  }
  async function recordOpenedLink(event) {
    event.preventDefault()
    if (isLoggedIn() && getUserId() === dash.userId) {
      const newSavedLink = {
        isArchive: false,
        dashId: Number(dash.id),
        queryUrl: event.target.value,
        userId: getUserId(),
      }
      const savedLinkResponse = await fetch('/api/SavedLinks', {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(newSavedLink),
      })
      if (savedLinkResponse.ok) {
        console.log('test')
        console.log(savedLinkResponse.json())
      } else {
        console.log(savedLinkResponse.json())
      }
    } else {
      console.log('AUTH ERROR')
    }
    window.location.assign(event.target.value)
  }

  async function postArchivedLink(event) {
    event.preventDefault()
    if (isLoggedIn() && getUserId() === dash.userId) {
      const newSavedLink = {
        isArchive: true,
        dashId: Number(dash.id),
        queryUrl: event.target.value,
        userId: getUserId(),
      }
      const archivedLinkResponse = await fetch('/api/SavedLinks', {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(newSavedLink),
      })
      if (archivedLinkResponse.ok) {
        console.log('test')
        console.log(archivedLinkResponse.json())
      } else {
        console.log('ERROR')
      }
    } else {
      console.log('ERROR')
    }
  }

  async function getQueryResults(event) {
    event.preventDefault()
    setSearchResults([])
    // setWaitingForSearchResults(true)
    let response
    if (searchTerm === '') {
      response = await fetch(`/api/Query/${lastSearchTerm}?dashId=${dash.id}`)
      localStorage.setItem(`searchTerm${dash.id}`, lastSearchTerm)
    } else {
      response = await fetch(`/api/Query/${searchTerm}?dashId=${dash.id}`)
      localStorage.setItem(`searchTerm${dash.id}`, searchTerm)
    }
    if (response.ok) {
      const apiData = await response.json()
      let updatedSearchResults = []
      for (let i = 0; i < apiData.length; i++) {
        let panelId = Number(JSON.parse(apiData[i][0]))
        let apiResult = JSON.parse(apiData[i][1])
        for (let j = 0; j < apiResult.results.length; j++) {
          let queryResult = {
            panelIdForResult: panelId,
            url: apiResult.results[j].url,
            summary: apiResult.results[j].sum,
            title: apiResult.results[j].title,
          }
          updatedSearchResults.push(queryResult)
        }
      }
      setSearchResults(updatedSearchResults)
      localStorage.setItem(
        `searchResults${dash.id}`,
        JSON.stringify(updatedSearchResults)
      )
    }
  }

  function filterSearchResults(newSearchResults, panelId) {
    if (newSearchResults.length === 0) {
      if (waitingForSearchResults === false) {
        try {
          const parsedLocalStorage = JSON.parse(lastSearchResults)

          return parsedLocalStorage.filter(
            (queryResult) => queryResult.panelIdForResult === panelId
          )
        } catch (error) {
          return []
        }
      } else {
        return []
      }
    } else {
      return newSearchResults.filter(
        (queryResult) => queryResult.panelIdForResult === panelId
      )
    }
  }

  function Panel(props) {
    return (
      <div className="panelContainer">
        <button className="header">{props.rootPanel.filterSiteName}</button>
        <div rows="7" cols="1" wrap="off" className="panel">
          {!props.panelSearchResults
            ? []
            : props.panelSearchResults
                .slice(0, dash.linksPerPanel)
                .map((panelSearchResult) => (
                  <QLink resultInfo={panelSearchResult} />
                ))}
        </div>{' '}
      </div>
    )
  }

  function QLink(props) {
    return (
      <div className="link">
        {isLoggedIn() && getUserId() === dash.userId ? (
          <button
            className="viewLink"
            value={props.resultInfo.url}
            onClick={(event) => postArchivedLink(event)}
          >
            Archive Link
          </button>
        ) : null}
        <div className="content">
          <button
            className="title"
            value={props.resultInfo.url}
            onClick={(event) => recordOpenedLink(event)}
          >
            {props.resultInfo.title}
          </button>
          <p className="summary">{props.resultInfo.summary}</p>
          <button
            className="url"
            value={props.resultInfo.url}
            onClick={(event) => recordOpenedLink(event)}
          >
            {props.resultInfo.url}
          </button>
        </div>
      </div>
    )
  }

  // async function postArchivedLink(link) {
  //   const newSavedLink = {
  //     isArchive: true,
  //     dashId: id,
  //     queryUrl: link,
  //   }
  //   const archivedLinkResponse = await fetch('/api/SavedLinks', {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(newSavedLink),
  //   })
  //   console.log(archivedLinkResponse.json())
  // }

  useEffect(() => {
    getDash()
  }, [id])

  function setUpdatedSearchTerm(newSearchTerm) {
    setSearchTerm(newSearchTerm)
    setWaitingForSearchResults(true)
  }

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">{dash.name}</h1>
        </Link>{' '}
      </header>
      <main className="main">
        <div className="containerDashQuery">
          {menuOpen ? (
            <>
              <div className="dashQuery">
                <form onSubmit={getQueryResults} className="dashQuery">
                  {!waitingForSearchResults ? (
                    <>
                      <input
                        className="dashQuery"
                        type="text"
                        placeholder="Query Here"
                        value={
                          !waitingForSearchResults ? lastSearchTerm : searchTerm
                        }
                        onChange={(event) => {
                          setUpdatedSearchTerm(event.target.value)
                        }}
                      />
                      <input type="submit" className="search" value="Search" />
                    </>
                  ) : (
                    <>
                      <input
                        className="dashQuery"
                        type="text"
                        placeholder="Query Here"
                        value={searchTerm}
                        onChange={(event) => {
                          setUpdatedSearchTerm(event.target.value)
                        }}
                      />
                      <input type="submit" className="search" value="Search" />
                    </>
                  )}
                </form>
                <div className="buttonContainer2">
                  {getUserId() === dash.userId ? (
                    <Link to={`/preferences/${dash.id}`}>
                      <button>Dash Settings</button>
                    </Link>
                  ) : null}
                  {isLoggedIn() ? (
                    <>
                      <Link to="/historyandarchives">
                        <button>Browse Later</button>
                      </Link>
                      <Link to="/create-dash">
                        <button>Create Dash</button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/create-account" className="navLink">
                        Log In
                      </Link>
                      <Link to="/create-account" className="navLink">
                        Sign Up
                      </Link>
                    </>
                  )}
                  <Link to="/">
                    <button>Home</button>
                  </Link>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="collapseMenu"
              >
                X
              </button>
            </>
          ) : (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="collapsedMenu"
            >
              Open Menu
            </button>
          )}
        </div>
        <div className="displayContainer">
          <div className="display">
            {dash.dashPanelAssignments.map((dashPanelAssignment) => (
              <Panel
                rootPanel={dashPanelAssignment.rootPanel}
                panelSearchResults={filterSearchResults(
                  searchResults,
                  dashPanelAssignment.rootPanel.id
                )}
              />
            ))}
          </div>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/about" className="navLink">
          About
        </Link>
      </footer>{' '}
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
// function CheckIfUrL(url) {
//   if (!isWebUri(url)) {
//     return false
//   }
//   else {
//     return true
//   }
// }
