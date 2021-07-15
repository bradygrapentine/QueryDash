import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { isLoggedIn, logout, getUserId, getUser, authHeader } from '../auth'

export function LandingPage() {
  const user = getUser()

  const history = useHistory()

  const [newSearch, setNewSearch] = useState('')

  const [userDashes, setUserDashes] = useState([])

  const [otherDashes, setOtherDashes] = useState([])

  const [presetDashes, setPresetDashes] = useState([])

  const [otherDashesNonUser, setOtherDashesNonUser] = useState([])

  const [presetDashesNonUser, setPresetDashesNonUser] = useState([])

  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  // const [reverseActive, setReverseActive] = useState(false)

  // function reverseOrder(event) {
  //   event.preventDefault()
  //   if (isLoggedIn()) {
  //     const reversedUserDashes = [...userDashes].reverse()
  //     setUserDashes(reversedUserDashes)
  //     const reversedOtherDashes = [...otherDashes].reverse()
  //     setOtherDashes(reversedOtherDashes)
  //     const reversedPresetDashes = [...presetDashes].reverse()
  //     setUserDashes(reversedPresetDashes)
  //   } else {
  //     const reversedOtherDashesNonUser = [...otherDashesNonUser].reverse()
  //     setOtherDashesNonUser(reversedOtherDashesNonUser)
  //     const reversedPresetDashesNonUser = [...presetDashesNonUser].reverse()
  //     setPresetDashesNonUser(reversedPresetDashesNonUser)
  //   }
  //   setReverseActive(!reverseActive)
  // }

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
              <input
                className="filterDashes"
                type="text"
                placeholder="Filter Dashboards"
                value={newSearch}
                onChange={(event) => {
                  setNewSearch(event.target.value)
                }}
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
                {userDashes.length !== 0 ? (
                  userDashes
                    .filter((userDash) =>
                      userDash.name
                        .toLowerCase()
                        .includes(newSearch.toLowerCase())
                    )
                    .map((dash) => (
                      <li key={dash.id}>
                        <Link to={`/dash/${dash.id}`} className="">
                          {dash.name}
                        </Link>
                        <div>
                          <button
                            onClick={() => history.push(`/dash/${dash.id}`)}
                          >
                            Use Dash
                          </button>
                          <button
                            className="preferences"
                            onClick={() =>
                              history.push(`/preferences/${dash.id}`)
                            }
                          >
                            Edit Dash
                          </button>
                        </div>
                      </li>
                    ))
                ) : (
                  <p>Loading...</p>
                )}
              </ul>
            </div>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">Try a Preset Dash</h3>
              <ul className="DisplayListDash">
                {presetDashes.length !== 0 ? (
                  presetDashes
                    .filter((presetDash) =>
                      presetDash.name
                        .toLowerCase()
                        .includes(newSearch.toLowerCase())
                    )
                    .map((dash) => (
                      <li key={dash.id}>
                        <Link to={`/dash/${dash.id}`} className="">
                          {dash.name}
                        </Link>
                        <div>
                          <button
                            onClick={() => history.push(`/dash/${dash.id}`)}
                          >
                            Use Dash
                          </button>
                        </div>
                      </li>
                    ))
                ) : (
                  <p>Loading...</p>
                )}
              </ul>
            </div>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">Other User's Dashes</h3>
              <ul className="DisplayListDash">
                {otherDashes.length !== 0 ? (
                  otherDashes
                    .filter((otherDash) =>
                      otherDash.name
                        .toLowerCase()
                        .includes(newSearch.toLowerCase())
                    )
                    .map((dash) => (
                      <li key={dash.id}>
                        <Link to={`/dash/${dash.id}`} className="">
                          {dash.name}
                        </Link>
                        <div>
                          <button
                            onClick={() => history.push(`/dash/${dash.id}`)}
                          >
                            Use Dash
                          </button>
                        </div>
                      </li>
                    ))
                ) : (
                  <p>Loading...</p>
                )}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="listOfDashes">
              <h3 className="HeaderDashList">Try a Preset Dash</h3>
              <ul className="DisplayListDash">
                {presetDashesNonUser.length !== 0 ? (
                  presetDashesNonUser
                    .filter((presetDashNonUser) =>
                      presetDashNonUser.name
                        .toLowerCase()
                        .includes(newSearch.toLowerCase())
                    )
                    .map((dash) => (
                      <li key={dash.id}>
                        <Link to={`/dash/${dash.id}`}> {dash.name}</Link>

                        <div>
                          {' '}
                          <button
                            onClick={() => history.push(`/dash/${dash.id}`)}
                          >
                            Use Dash
                          </button>
                        </div>
                      </li>
                    ))
                ) : (
                  <p>Loading...</p>
                )}
              </ul>
            </div>
            <div className="listOfDashes">
              <h3 className="HeaderDashList"> Try a User's Dash</h3>
              <ul className="DisplayListDash">
                {otherDashesNonUser.length !== 0 ? (
                  otherDashesNonUser
                    .filter((otherDashNonUser) =>
                      otherDashNonUser.name
                        .toLowerCase()
                        .includes(newSearch.toLowerCase())
                    )
                    .map((dash) => (
                      <li key={dash.id}>
                        <Link to={`/dash/${dash.id}`}> {dash.name}</Link>

                        <div>
                          {' '}
                          <button
                            onClick={() => history.push(`/dash/${dash.id}`)}
                          >
                            Use Dash
                          </button>
                        </div>
                      </li>
                    ))
                ) : (
                  <p>Loading...</p>
                )}
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
