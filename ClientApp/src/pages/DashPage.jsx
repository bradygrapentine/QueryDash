import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserId, authHeader } from '../auth'
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

  const [searchResults, setSearchResults] = useState([])

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

  async function getQueryResults(event) {
    event.preventDefault()
    const response = await fetch(`/api/Query/${searchTerm}?dashId=${dash.id}`)
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
    }
  }

  function filterSearchResults(newSearchResults, panelId) {
    if (newSearchResults.length === 0) {
      return []
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

  // async function recordOpenedLink(url) {
  //   // event.preventDefault.preventDefault()
  //   const newSavedLink = {
  //     isArchive: false,
  //     dashId: Number(dash.id),
  //     queryUrl: url,
  //     userId: getUserId(),
  //   }
  //   const archivedLinkResponse = await fetch('/api/SavedLinks', {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json', ...authHeader() },
  //     body: JSON.stringify(newSavedLink),
  //   })
  //   console.log('test')
  // }

  async function postArchivedLink(event) {
    event.preventDefault()
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
  }

  function QLink(props) {
    return (
      <div className="link">
        <button
          className="viewLink"
          value={props.resultInfo.url}
          onClick={(event) => postArchivedLink(event)}
        >
          Archive Link
        </button>
        <div className="content">
          <a href={props.resultInfo.url}>
            {' '}
            <p className="title">{props.resultInfo.title}</p>
          </a>
          <p className="summary">{props.resultInfo.summary}</p>
          <a href={props.resultInfo.url}>
            <p className="url">{props.resultInfo.url}</p>
          </a>
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

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">{dash.name}</h1>
      </Link>{' '}
      <main className="main">
        <div className="containerDashQuery">
          {menuOpen ? (
            <>
              <div className="dashQuery">
                <form onSubmit={getQueryResults} className="dashQuery">
                  {' '}
                  {/* onSubmit={runDashQuery} */}
                  <input
                    className="dashQuery"
                    type="text"
                    placeholder="Query Here"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value)
                    }}
                  />
                  <input type="submit" className="search" value="Search" />
                </form>
                <div className="buttonContainer2">
                  <Link to="/archive">
                    <button>Archives</button>
                  </Link>
                  <Link to="/history">
                    <button>History</button>
                  </Link>
                  <Link to="/preferences">
                    <button>Dash Settings</button>
                  </Link>
                  <Link to="/">
                    <button>Home</button>
                  </Link>
                </div>{' '}
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
        <Link to="/create-account" className="navLink">
          Sign Up
        </Link>
        <Link to="/create-dash" className="navLink">
          Create Dash{' '}
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
