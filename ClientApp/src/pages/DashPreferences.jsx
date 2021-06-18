import React from 'react'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

// probably just a drop down on Dash pages and Account page for more general styling

export function DashPreferences() {
  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>
      <button className="accountInfoSubmit">Submit Changes</button>
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form action="" className="formCreateAccount">
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="createAccount">Info Field:</label>
                <input
                  name="createAccount"
                  type="text"
                  placeholder="info here"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/account" className="navLink">
          Account
        </Link>
        <Link to="/dash" className="navLink">
          Back to Dash{' '}
        </Link>
      </footer>
    </>
  )
}
