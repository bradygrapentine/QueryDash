import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { isWebUri } from 'valid-url'

// ------------------------------------------------------------- //

// ------------------------------------------------------------- //

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

  // const [dashQueryResults, setDashQueryResults] = useState([])

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
      for (let i = 0; i < apiData.length; i++) {
        let jsonResult = JSON.parse(apiData[i])
        for (let j = 0; j < jsonResult.results.length; j++) {
          let result = {
            filterSite: jsonResult.results[j].site,
            url: jsonResult.results[j].url,
            summary: jsonResult.results[j].sum,
            title: jsonResult.results[j].title,
          }
          console.log(result)
          // let updatedSearchResults = searchResults.push(result)
          // setSearchResults(updatedSearchResults)
          // console.log(searchResults.length)
        }
      }
    }
  }

  // function Panel(props) {
  //   return (
  //     <div className="panelContainer">
  //       <button className="header">{props.rootPanel.filterSiteName}</button>
  //       <div rows="7" cols="1" wrap="off" className="panel">
  //         {props.panelSearchResults.map((panelSearchResult) => (
  //           <QLink resultInfo={panelSearchResult} />
  //         ))}
  //       </div>{' '}
  //     </div>
  //   )
  // }

  // function QLink(props) {
  //   return (
  //     <div className="link">
  //       <button></button>
  //       <a href={props.resultInfo.url}>
  //         {' '}
  //         <p>{props.resultInfo.title}</p>
  //       </a>
  //       <button className="viewDescription">description</button>
  //       <button className="viewLink">view</button>
  //       <button className="viewLink">image</button>
  //     </div>
  //   )
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
                </form>
                <div className="buttonContainer1">
                  <button>Open</button>
                  <button>Archive</button>
                </div>
                <div className="buttonContainer2">
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
                panelSearchResults={
                  searchResults.length === 0
                    ? []
                    : searchResults.filter(
                        (searchResult) =>
                          searchResult.filterSite ===
                          dashPanelAssignment.rootPanel.filterSite
                      )
                }
              />
            ))}
          </div>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/create-account" className="navLink">
          Sign Up
        </Link>
        <Link to="/about" className="navLink">
          About
        </Link>
        <Link to="/account" className="navLink">
          Account
        </Link>
        <Link to="/" className="navLink">
          Home
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
