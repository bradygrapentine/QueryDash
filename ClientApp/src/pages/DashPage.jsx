import React from 'react'
import { Link } from 'react-router-dom'
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
      <button>Open</button>
      <button>Archive</button>
      <button>History</button>
      <button>Dash Settings</button>
      <button className="settings">Account</button>
      <button>Home</button>
      {/* <button className="collapseMenu">Collapse</button> */}
      <button className="collapseMenu">X</button>
      {/* Gotta Fix this in mobile view */}
    </div>
  )
}

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
  return (
    <>
      {/* <Link to="/"> */}
      {/* <h1 className="header">QueryDash</h1> */}
      {/* </Link> */}
      <Link className="linkForHeader" to="/">
        <h1 className="header">DashHeader</h1>
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
