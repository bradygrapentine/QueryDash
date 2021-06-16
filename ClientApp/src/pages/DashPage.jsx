import React from 'react'
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

export function DashQuery(params) {
  return (
    <div className="dashQuery">
      Search
      <form className="dashQuery">
        <input className="dashQuery" type="text" placeholder="Query Here" />
      </form>
      <button className="collapse">Collapse</button>
    </div>
  )
}

// ------------------------------------------------------------- //

export function Menu(params) {
  return (
    <section className="menu">
      Menu
      <div className="menuContent">
        <button>Open</button>
        <button>Archive</button>
        <button>History</button>
        <button>Dash Settings</button>
        <button className="settings">Account</button>
        <button>Home</button>
        <button className="collapseMenu">Collapse</button>
      </div>
    </section>
  )
}

// ------------------------------------------------------------- //

export function Footer(params) {
  return (
    <footer>
      <a href="https://www.google.com/" className="footer">
        About
      </a>
      <a href="https://www.google.com/" className="footer">
        Sign Up
      </a>
      <a href="https://www.google.com/" className="footer">
        Contact
      </a>
    </footer>
  )
}

// ------------------------------------------------------------- //

export function DashPage() {
  return (
    <>
      <h2 className="header">Dash Header</h2>
      {/* header needs a nav to get around to pages
      Gotta build out static html and css for other pages */}
      <main className="main">
        <DashQuery />
        <Menu />
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
      <Footer />
    </>
  )
}

// ------------------------------------------------------------- //
