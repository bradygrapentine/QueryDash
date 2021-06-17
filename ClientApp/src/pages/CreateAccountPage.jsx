import React from 'react'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

export function CreateAccountPage() {
  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="mainCreateAccount">
        {/* <p className="tbd"> Under Construction</p> */}
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
      <button className="accountInfoSubmit">Create Account</button>
      <footer className="createAccountPageFooter">
        <Link to="/about" className="standardFooter">
          About
        </Link>
        <Link to="/" className="standardFooter">
          Home
        </Link>
        <Link to="/create-dash" className="standardFooter">
          Create Dash{' '}
        </Link>
        {/* <a href="https://www.google.com/" className="footer">
        Contact
      </a> */}
      </footer>
    </>
  )
}
