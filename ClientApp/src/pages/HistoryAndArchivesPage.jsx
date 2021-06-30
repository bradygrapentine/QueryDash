import React, { useState, useEffect } from 'react'
// import {  } from 'react-router-dom'
// import { Footer } from './DashPage'
import { Link } from 'react-router-dom'
import { isLoggedIn, authHeader } from '../auth'
// import './custom.scss'

// ------------------------------------------------------------- //

export function HistoryAndArchivesPage() {
  async function deleteSavedLink(savedLinkId) {
    const response = await fetch(`/api/SavedLinks/${savedLinkId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.ok) {
      getSavedLinks()
    }
  }

  const [savedLinks, setSavedLinks] = useState([])

  async function getSavedLinks() {
    const response = await fetch(`/api/SavedLinks`, {
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.ok) {
      const newSavedLinks = await response.json()
      setSavedLinks(newSavedLinks)
      console.log(newSavedLinks)
    }
  }

  function formatDate(dateAsString) {
    let date = Date.parse(dateAsString + '+04:00')
    // let newOptions = {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // }
    let formattedDate = Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date)
    return formattedDate
  }

  useEffect(() => {
    getSavedLinks()
  }, [])

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">QueryDash</h1>
        </Link>{' '}
      </header>
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
                      .filter((savedLink) => savedLink.isArchive === true)
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
                      .filter((savedLink) => savedLink.isArchive === false)
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
      <footer className="standardFooter">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/create-dash" className="navLink">
          Create Dash{' '}
        </Link>
      </footer>
    </>
  )
}
