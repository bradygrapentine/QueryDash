import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn, authHeader, logout } from '../auth'

// ------------------------------------------------------------- //

export function HistoryAndArchivesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const [savedLinks, setSavedLinks] = useState([])

  async function deleteSavedLink(savedLinkId) {
    const response = await fetch(`/api/SavedLinks/${savedLinkId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.ok) {
      getSavedLinks()
    }
  }

  async function getSavedLinks() {
    const response = await fetch(`/api/SavedLinks`, {
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.ok) {
      const newSavedLinks = await response.json()
      setSavedLinks(newSavedLinks)
    }
  }

  function formatDate(dateAsString) {
    let date = Date.parse(dateAsString + '+04:00')
    let formattedDate = Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date)
    return formattedDate
  }

  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  useEffect(() => {
    getSavedLinks()
  }, [])

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">Browse Later</h1>
        </Link>{' '}
      </header>
      <div className="navBar2">
        {isLoggedIn() ? (
          <>
            <ul className="navBar">
              <Link to="/" className="navLink">
                Home
              </Link>
              <Link to="/create-dash" className="navLink">
                Create Dash
              </Link>
            </ul>
            <form className="filterDashes">
              {' '}
              <input
                className="filterDashes"
                type="text"
                placeholder="Filter by URL"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
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
            <Link to="/" className="navLink">
              Home
            </Link>
          </ul>
        )}
      </div>
      <main className="aboutPage">
        <article className="aboutPageArticle">
          <h5 className="header">Archives</h5>
          <ul className="savedLinkList">
            {isLoggedIn() ? (
              <>
                {savedLinks.filter((savedLink) => savedLink.isArchive === true)
                  .length > 0 ? (
                  <>
                    {savedLinks
                      .filter(
                        (savedLink) =>
                          savedLink.queryUrl
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) &&
                          savedLink.isArchive === true
                      )
                      .map((savedLink) => (
                        <>
                          <li className="savedLinkList">
                            <p className="savedLinkListLabel">
                              Archived-Link:{' '}
                            </p>
                            <a
                              className="savedLinkList"
                              href={savedLink.queryUrl}
                            >
                              {savedLink.queryUrl}
                            </a>
                            <p className="savedLinkListLabel">Archived On: </p>
                            <p className="savedLinkList">
                              {formatDate(savedLink.timeStamp)}{' '}
                            </p>
                            <p className="savedLinkListLabel">Archived At: </p>
                            <p className="savedLinkList">
                              {savedLink.rootDash.name}{' '}
                            </p>
                          </li>
                          <button
                            className="savedLinkList"
                            onClick={() => deleteSavedLink(savedLink.id)}
                          >
                            Delete
                          </button>
                        </>
                      ))}
                  </>
                ) : (
                  <p className="savedLinkList">No Archived Links</p>
                )}
              </>
            ) : (
              <p className="savedLinkList">Must Login to View Archives</p>
            )}
          </ul>
        </article>
        <article className="aboutPageArticle">
          <h5 className="header">Opened Links</h5>
          <ul className="savedLinkList">
            {isLoggedIn() ? (
              <>
                {savedLinks.filter((savedLink) => savedLink.isArchive === false)
                  .length > 0 ? (
                  <>
                    {savedLinks
                      .filter(
                        (savedLink) =>
                          savedLink.queryUrl
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) &&
                          savedLink.isArchive === false
                      )
                      .map((savedLink) => (
                        <>
                          <li className="savedLinkList">
                            <p className="savedLinkListLabel">Opened-Link: </p>
                            <a
                              className="savedLinkList"
                              href={savedLink.queryUrl}
                            >
                              {savedLink.queryUrl}
                            </a>
                            <p className="savedLinkListLabel">Opened On: </p>
                            <p className="savedLinkList">
                              {formatDate(savedLink.timeStamp)}{' '}
                            </p>
                            <p className="savedLinkListLabel">Opened At: </p>
                            <p className="savedLinkList">
                              {savedLink.rootDash.name}{' '}
                            </p>
                          </li>
                          <button
                            className="savedLinkList"
                            onClick={() => deleteSavedLink(savedLink.id)}
                          >
                            Delete
                          </button>
                        </>
                      ))}
                  </>
                ) : (
                  <p className="savedLinkList">No Archived Links</p>
                )}
              </>
            ) : (
              <p className="savedLinkList">Must Login to View Archives</p>
            )}
          </ul>
        </article>
      </main>
      <footer className="standardFooter2">
        <Link to="/about" className="navLink">
          About
        </Link>
      </footer>
    </>
  )
}
