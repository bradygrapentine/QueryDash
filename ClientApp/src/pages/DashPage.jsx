import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

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

export function DashPage() {
  const [menuOpen, setMenuOpen] = useState(true)

  const [dash, setDash] = useState({
    creationDate: '',
    name: '',
    // panels: null,
    // panelAssignments: null,
    // savedLinks: null,
    linksPerPanel: 0,
  })

  const params = useParams()

  const id = params.id

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)

    if (response.ok) {
      const apiData = await response.json()
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
    )
  }

  useEffect(() => {
    getDash()
  }, [id])

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">{dash.name}</h1>
      </Link>{' '}
      <main className="main">
        <DashQuery />
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
      </footer>{' '}
    </>
  )
}
