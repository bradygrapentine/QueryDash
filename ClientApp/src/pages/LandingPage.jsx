import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { isLoggedIn, logout, getUserId, getUser, authHeader } from '../auth'

// import { Footer } from './DashPage'
// import './custom.scss'

// ------------------------------------------------------------- //

// function DashList(params) {

// }

export function LandingPage() {
  const user = getUser()

  const history = useHistory()

  // const [newDash, setNewDash] = useState({
  //   userId: 0,
  //   creationDate: '',
  //   dashPanelAssignments: [],
  //   savedLinks: [],
  //   : '',
  //   linksPerPanel: 0,
  // })

  async function postPanelAssignments(dashId, dashPanelAssignments) {
    for (var i = 0; i < dashPanelAssignments.length; i++) {
      let newPanelAssignment = {
        panelId: dashPanelAssignments[i].panelId,
        dashId: dashId,
      }
      let panelAssignmentResponse = await fetch('/api/PanelAssignments', {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...authHeader() },
        body: JSON.stringify(newPanelAssignment),
      })
      console.log(panelAssignmentResponse.json())
    }
    window.location.assign(`/dash/${dashId}`)
  }

  async function copyDash(dash, event) {
    event.preventDefault()
    let newDash = {}
    newDash.userId = getUserId()
    newDash.dashPanelAssignments = []
    newDash.savedLinks = []
    newDash.name = dash.name
    newDash.creationDate = ''
    newDash.linksPerPanel = dash.linksPerPanel
    const response = await fetch('/api/Dashes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newDash),
    })
    if (response.status === 401) {
      console.log('Not Authorized')
    } else {
      if (response.status === 400) {
        console.log(Object.values(response.errors).join(' '))
      } else if (response.ok) {
        response.json().then((data) => {
          postPanelAssignments(data.id, dash.dashPanelAssignments)
        })
      }
    }
  }

  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  const [userDashes, setUserDashes] = useState([])

  const [otherDashes, setOtherDashes] = useState([])

  const [presetDashes, setPresetDashes] = useState([])

  const [otherDashesNonUser, setOtherDashesNonUser] = useState([])

  const [presetDashesNonUser, setPresetDashesNonUser] = useState([])

  useEffect(function () {
    async function loadDashLists() {
      if (!isLoggedIn()) {
        const nonUserDashesUrl = '/api/Dashes/UsersNoAccount'
        const nonUserPresetsUrl = '/api/Dashes/PresetsNoAccount'

        //--------------------------------------//
        const nonUserDashesResponse = await fetch(nonUserDashesUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })

        const nonUserPresetsResponse = await fetch(nonUserPresetsUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        //--------------------------------------//
        if (nonUserDashesResponse.ok) {
          const nonUserDashesResponseJson = await nonUserDashesResponse.json()
          setOtherDashesNonUser(nonUserDashesResponseJson)
        }
        if (nonUserPresetsResponse.ok) {
          const nonUserPresetsResponseJson = await nonUserPresetsResponse.json()
          setPresetDashesNonUser(nonUserPresetsResponseJson)
        }
        //--------------------------------------//
      } else {
        const dashesUrl = '/api/Dashes/OtherDashes'
        const userDashesUrl = 'api/Dashes/User'
        const presetsUrl = 'api/Dashes/Presets'

        //--------------------------------------//
        const otherDashesResponse = await fetch(dashesUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        const userDashesResponse = await fetch(userDashesUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        const presetDashesResponse = await fetch(presetsUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        //--------------------------------------//
        if (otherDashesResponse.ok) {
          const otherDashesResponseJson = await otherDashesResponse.json()
          setOtherDashes(otherDashesResponseJson)
        }
        //--------------------------------------//
        if (userDashesResponse.ok) {
          const userDashesResponseJson = await userDashesResponse.json()
          setUserDashes(userDashesResponseJson)
        }
        //--------------------------------------//
        if (presetDashesResponse.ok) {
          const presetsResponseJson = await presetDashesResponse.json()
          setPresetDashes(presetsResponseJson)
        }
      }
    }
    loadDashLists()
  }, [])

  //--------------------------------------//

  return (
    <>
      <header className="altHeader">
        <h1 className="altHeader">QueryDash</h1>
      </header>
      <div className="navBar">
        {isLoggedIn() ? (
          <>
            <ul className="navBar">
              <Link to="/create-dash" className="navLink">
                Create Dash
              </Link>
              <Link to="/historyandarchives" className="navLink">
                Browse Later
              </Link>
            </ul>
            <form className="filterDashes">
              {' '}
              {/* onSubmit={runDashQuery} */}
              <input
                className="filterDashes"
                type="text"
                placeholder="Filter Dashboards"
                // value={searchTerm}
                // onChange={(event) => {
                //   setSearchTerm(event.target.value)
              />
            </form>
            <span className="navLink" onClick={handleLogout}>
              Log Out
            </span>
          </>
        ) : (
          <ul className="navBar">
            <Link to="/create-account" className="navLink">
              Sign Up
            </Link>
            <Link to="/login" className="navLink">
              Log in
            </Link>
            <Link to="/about" className="navLink">
              About
            </Link>
          </ul>
        )}
      </div>
      <main className="landingPageContainer">
        {isLoggedIn() ? (
          <>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">{user.name}'s Dashboards</h3>
              <ul className="DisplayListDash">
                {userDashes.map((dash) => (
                  <li key={dash.id}>
                    <Link to={`/dash/${dash.id}`} className="">
                      {dash.name}
                    </Link>
                    <div>
                      <button onClick={() => history.push(`/dash/${dash.id}`)}>
                        Use Dash
                      </button>
                      <button
                        onClick={() => history.push(`/preferences/${dash.id}`)}
                      >
                        Edit Dash
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">Preset Dashes</h3>
              <ul className="DisplayListDash">
                {presetDashes.map((dash) => (
                  <li key={dash.id}>
                    <Link to={`/dash/${dash.id}`} className="">
                      {dash.name}
                    </Link>
                    <form onSubmit={(event) => copyDash(dash, event)}>
                      <input type="submit" value="Copy Dash" />
                    </form>
                  </li>
                ))}
              </ul>
            </div>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">Other User's Dashes</h3>
              <ul className="DisplayListDash">
                {otherDashes.map((dash) => (
                  <li key={dash.id}>
                    <Link to={`/dash/${dash.id}`} className="">
                      {dash.name}
                    </Link>
                    <form onSubmit={(event) => copyDash(dash, event)}>
                      <input type="submit" value="Copy Dash" />
                    </form>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">Preset Dashes</h3>
              <ul className="DisplayListDash">
                {presetDashesNonUser.map((dash) => (
                  <li key={dash.id}>
                    <Link to={`/dash/${dash.id}`}>{dash.name}</Link>

                    <div>
                      {' '}
                      <button onClick={() => history.push(`/dash/${dash.id}`)}>
                        Use Dash
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="listOfDashes">
              <h3 className="HeaderDashList"> Try a User's Dash</h3>
              <ul className="DisplayListDash">
                {otherDashesNonUser.map((dash) => (
                  <li key={dash.id}>
                    <Link to={`/dash/${dash.id}`}>{dash.name}</Link>

                    <div>
                      {' '}
                      <button onClick={() => history.push(`/dash/${dash.id}`)}>
                        Use Dash
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
      <footer className="standardFooter">
        {isLoggedIn() ? (
          <Link to="/about" className="navLink">
            About
          </Link>
        ) : null}
      </footer>
    </>
  )
}
