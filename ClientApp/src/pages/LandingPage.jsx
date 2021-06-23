import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { isLoggedIn, logout, getUser, authHeader } from '../auth'

// import { Footer } from './DashPage'
// import './custom.scss'

// ------------------------------------------------------------- //

// function DashList(params) {

// }

export function LandingPage() {
  const [dashList, setDashList] = useState([])

  const [userDashList, setUserDashList] = useState([])

  const user = getUser()

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
      const dashesUrl = '/api/Dashes'
      const userDashesUrl = 'api/Dashes/User'

      const dashesResponse = await fetch(dashesUrl)
      const userDashesResponse = await fetch(userDashesUrl, {
        headers: { 'content-type': 'application/json', ...authHeader() },
      })

      if (dashesResponse.ok) {
        const dashesJson = await dashesResponse.json()
        setDashList(dashesJson)
      }

      if (userDashesResponse.ok) {
        const userDashesJson = await userDashesResponse.json()
        setUserDashList(userDashesJson)
      } else {
        return
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
        <div className="listOfDashes">
          {isLoggedIn() ? (
            <>
              <h3 className="HeaderDashList">{user.name}'s Dashboards</h3>
              <ul className="DisplayListDash">
                {userDashList.map((dash) => (
                  <li key={dash.id}>
                    <Link to={`/dash/${dash.id}`} className="">
                      {dash.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div className="listOfDashes">
          <h3 className="HeaderDashList">Preset Dashes</h3>
          <ul className="DisplayListDash">
            {dashList.map((dash) => (
              <li key={dash.id}>
                <Link to={`/dash/${dash.id}`} className="">
                  {dash.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
        <Link to="/account" className="navLink">
          Account
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
