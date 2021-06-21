import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
// import { Footer } from './DashPage'
// import './custom.scss'

// ------------------------------------------------------------- //

// function DashList(params) {

// }

export function LandingPage() {
  const [dashList, setDashList] = useState([])

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

  async function loadDashList() {
    const url = '/api/Dash'

    const response = await fetch(url)

    if (response.ok) {
      const json = await response.json()

      setDashList(json)
    }
  }

  useEffect(function () {
    loadDashList()
    console.log(dashList)
  }, [])

  //--------------------------------------//

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="landingPageContainer">
        <div className="listOfDashes">
          <h3 className="HeaderDashList">Preset Dashes</h3>
          <ul className="DisplayListDash">
            {dashList.map((dash) => {
              ;<li>
                <Link to={`/dash/${dash.Id}`} className="">
                  {dash.DashName}
                </Link>
              </li>
            })}
          </ul>
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
        <Link to="/create-dash" className="navLink">
          Create Dash{' '}
        </Link>
      </footer>
    </>
  )
}
