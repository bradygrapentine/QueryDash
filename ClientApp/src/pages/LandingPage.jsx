import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { isLoggedIn, logout, getUserId, getUser, authHeader } from '../auth'

// import { Footer } from './DashPage'
// import './custom.scss'

// ------------------------------------------------------------- //

// function DashList(params) {

// }

export function LandingPage() {
  const [dashList, setDashList] = useState([])

  const [userDashList, setUserDashList] = useState([])

  const [nonUserDashList, setNonUserDashList] = useState([])

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
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newPanelAssignment),
      })
      console.log(panelAssignmentResponse.json())
    }
    window.location.assign('/')
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

  // async function handleDashFormSubmission(event) {
  //   event.preventDefault()

  //   if (response.status === 401) {
  //     setDashFormErrorMessage('Not Authorized')
  //   } else {
  //     if (response.status === 400) {
  //       setDashFormErrorMessage(Object.values(response.errors).join(' '))
  //     } else if (response.ok) {
  //       response.json().then((data) => {
  //         setNewDashId(data.id)
  //         console.log(data)
  //       })
  //     }
  //   }
  // }

  // {
  //   id: null,
  //   creationDate: '',
  //   dashName: '',
  //   isPreset: null,
  //   presetPublicationDate: '',
  //   panels: null,
  //   panelAssignment: null,
  //   savedLinks: null,
  //   searchHistory: null,
  //   linksPerPanel: 10,
  // },
  // function loadDashList() {

  // }

  // function DashListItem() {
  //   return (
  //     <li>
  //       <Link to="/dash:id" className="">
  //         DashPage
  //       </Link>
  //     </li>
  //   )
  // }

  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  useEffect(function () {
    async function loadDashLists() {
      if (!isLoggedIn()) {
        const nonUserDashesUrl = '/api/Dashes/NoAccount'
        //--------------------------------------//
        const nonUserDashesResponse = await fetch(nonUserDashesUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        //--------------------------------------//
        if (nonUserDashesResponse.ok) {
          const nonUserDashesResponseJson = await nonUserDashesResponse.json()
          setNonUserDashList(nonUserDashesResponseJson)
        }
        //--------------------------------------//
      } else {
        const dashesUrl = '/api/Dashes'
        const userDashesUrl = 'api/Dashes/User'
        //--------------------------------------//
        const dashesResponse = await fetch(dashesUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        const userDashesResponse = await fetch(userDashesUrl, {
          headers: { 'content-type': 'application/json', ...authHeader() },
        })
        //--------------------------------------//
        if (dashesResponse.ok) {
          const dashesJson = await dashesResponse.json()
          setDashList(dashesJson)
        }
        //--------------------------------------//
        if (userDashesResponse.ok) {
          const userDashesJson = await userDashesResponse.json()
          setUserDashList(userDashesJson)
        } else {
          return
        }
      }
    }
    loadDashLists()
  }, [])

  console.log(dashList)

  //--------------------------------------//

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="landingPageContainer">
        {isLoggedIn() ? (
          <>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">{user.name}'s Dashboards</h3>
              <ul className="DisplayListDash">
                {userDashList.map((dash) => (
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
              <h3 className="HeaderDashList">Other Dashboards</h3>
              <ul className="DisplayListDash">
                {dashList.map((dash) => (
                  <li key={dash.id}>
                    {/* <Link to={`/dash/${dash.id}`} className=""> */}
                    {dash.name}
                    {/* </Link> */}
                    <form
                      onSubmit={(event) => copyDash(dash, event)}
                      // className="formCreateAccount"
                    >
                      <input type="submit" value="Copy Dash" />
                    </form>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="listOfDashes">
            <h3 className="HeaderDashList">Existing Dashboards</h3>
            <ul className="DisplayListDash">
              {nonUserDashList.map((dash) => (
                <li key={dash.id}>
                  <Link to={`/dash/${dash.id}`} className="">
                    {dash.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="standardFooter">
        {isLoggedIn() ? (
          <span className="navLink" onClick={handleLogout}>
            Log Out
          </span>
        ) : (
          <>
            <Link to="/create-account" className="navLink">
              Sign Up
            </Link>
            <Link to="/login" className="navLink">
              Log in
            </Link>
          </>
        )}
        <Link to="/about" className="navLink">
          About
        </Link>
        {isLoggedIn() ? (
          <Link to="/create-dash" className="navLink">
            Create Dash{' '}
          </Link>
        ) : null}
      </footer>
    </>
  )
}
