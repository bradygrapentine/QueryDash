import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// import './custom.scss'

// ------------------------------------------------------------- //

export function QLink() {
  return (
    <div className="link">
      <button></button>
      <a href="https://en.wikipedia.org/wiki/Jack_Black">
        {' '}
        <p> Jack Black - Wikipedia</p>
      </a>
      <button className="viewDescription">description</button>
      <button className="viewLink">view</button>
      <button className="viewLink">image</button>
    </div>
  )
}

// ------------------------------------------------------------- //

export function Panel() {
  return (
    <div className="panelContainer">
      <button className="header">Endpoint Head</button>
      <div rows="7" cols="1" wrap="off" className="panel">
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
      </div>{' '}
    </div>
  )
}

// ------------------------------------------------------------- //

// ------------------------------------------------------------- //

// export function Menu(params) {
//   return (
//     <section className="menu">
//       Menu
//       <div className="menuContent">
//         <button>Open</button>
//         <button>Open</button>
//         <button>Archive</button>
//         <button>History</button>
//         <button>Dash Settings</button>
//         <button className="settings">Account</button>
//         <button>Home</button>
//         <button className="collapseMenu">Collapse</button>
//       </div>
//     </section>
//   )
// }

// ------------------------------------------------------------- //

// export function Footer(params) {
//   return (

//   )
// }

// ------------------------------------------------------------- //

export function DashPage() {
  const [menuOpen, setMenuOpen] = useState(true)

  const [dash, setDash] = useState({
    creationDate: '',
    dashName: '',
    isPreset: null,
    presetPublicationDate: '',
    panels: null,
    panelAssignment: null,
    savedLinks: null,
    searchHistory: null,
    linksPerPanel: 0,
  })

  const params = useParams()

  const id = params.id

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)

    if (response.ok) {
      const apiData = await response.json()
      // console.log(apiData)
      // console.log(apiData)

      setDash(apiData)
    }
  }

  function DashQuery(params) {
    return (
      <div className="containerDashQuery">
        {menuOpen ? (
          <>
            <div className="dashQuery">
              <form className="dashQuery">
                <input
                  className="dashQuery"
                  type="text"
                  placeholder="Query Here"
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
                {/* <Link to="/account">
                  <button>Account</button>{' '}
                </Link> */}
                <Link to="/">
                  <button>Home</button>
                </Link>
                {/* <button>Open</button> // buttons for non-users
                <Link to="/">
                  <button>Home</button>
                </Link> */}
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
    )
  }
  useEffect(() => {
    // console.log(dash)
    getDash()
    console.log(dash)
  }, [id])

  // useEffect(() => {
  //   getDash()
  //   console.log(dash)
  // }, [])

  return (
    <>
      {/* <Link to="/"> */}
      {/* <h1 className="header">QueryDash</h1> */}
      {/* </Link> */}
      <Link className="linkForHeader" to="/">
        <h1 className="header">{dash.dashName}</h1>
      </Link>{' '}
      {/* header needs a nav to get around to pages
      Gotta build out static html and css for other pages */}
      <main className="main">
        <DashQuery />
        {/* <Menu /> */}
        <div className="displayContainer">
          <div className="display">
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
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
        {/* <a href="https://www.google.com/" className="footer">
        Contact
      </a> */}
      </footer>{' '}
    </>
  )
}

// ------------------------------------------------------------- //
