import React from 'react'
import './custom.scss'

export function Link() {
  return (
    <div className="link">
      <button></button>
      <a href="https://www.google.com/">
        {' '}
        <p>Wikipedia</p>
      </a>
      <button className="viewDescription">description</button>
      <button className="viewLink">view</button>
    </div>
  )
}

export function Panel() {
  return (
    <div rows="7" cols="1" wrap="off" className="panel">
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
      <Link />
    </div>
  )
}

export function App() {
  return (
    <>
      <main className="main">
        <header>
          {' '}
          <h2>QueryDash</h2>
        </header>
        <div className="dashQuery">
          <form className="dashQuery">
            <input className="dashQuery" type="text" placeholder="Query Here" />
          </form>
          <button className="collapse">Collapse</button>
        </div>
        {/* <div className="container"> */}
        <h3 className="header">Dash Header</h3>
        <section className="menu">
          Menu
          <div className="menuContent">
            <button>Open</button>
            <button>Archive</button>
            <button>History</button>
            <button>Dash Settings</button>
            <button className="settings">Account</button>
            <button>Home</button>
            <button>Collapse</button>
          </div>
        </section>
        <div className="display">
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
          <div className="panelContainer">
            <p for="panel" className="header">
              Endpoint Head
            </p>
            <Panel />
          </div>
        </div>
        {/* </div> */}
      </main>
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
    </>
  )
}
