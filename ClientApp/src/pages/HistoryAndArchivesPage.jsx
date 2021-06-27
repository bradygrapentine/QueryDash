import React, { useState, useEffect } from 'react'
// import {  } from 'react-router-dom'
import { Footer } from './DashPage'
import { Link } from 'react-router-dom'
import { isLoggedIn, authHeader } from '../auth'
// import './custom.scss'

// ------------------------------------------------------------- //

export function HistoryAndArchivesPage() {
  const userHistory = [
    {
      id: 1,
      isArchive: false,
      userId: 1,
      dashId: 1,
      queryUrl: 'https://en.wikipedia.org/wiki/Dog',
      timeStamp: '2020-01-02T01:01:00',
    },
    {
      id: 5,
      isArchive: false,
      userId: 1,
      dashId: 1,
      queryUrl: 'https://en.wikipedia.org/wiki/Horse',
      timeStamp: '2020-01-02T05:01:00',
    },
    {
      id: 6,
      isArchive: false,
      userId: 1,
      dashId: 1,
      queryUrl: 'https://en.wikipedia.org/wiki/Camel',
      timeStamp: '2020-01-02T06:01:00',
    },
    {
      id: 13,
      isArchive: false,
      userId: 1,
      dashId: 3,
      queryUrl: 'https://en.wikipedia.org/wiki/Dog',
      timeStamp: '2020-01-04T01:01:00',
    },
    {
      id: 14,
      isArchive: false,
      userId: 1,
      dashId: 3,
      queryUrl: 'https://en.wikipedia.org/wiki/Cat',
      timeStamp: '2020-01-04T02:01:00',
    },
    {
      id: 17,
      isArchive: false,
      userId: 1,
      dashId: 3,
      queryUrl: 'https://en.wikipedia.org/wiki/Horse',
      timeStamp: '2020-01-04T05:01:00',
    },
  ]

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

  useEffect(() => {
    getSavedLinks()
  }, [])

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
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
                            <p className="savedLinkListLabel">Archived At: </p>
                            <p className="savedLinkList">
                              {savedLink.timeStamp}{' '}
                            </p>
                            <p className="savedLinkListLabel">Archived On: </p>
                            <p className="savedLinkList">
                              {savedLink.rootDash.name}{' '}
                            </p>
                          </li>
                          <button
                            className="savedLinkList"
                            onClick={() => deleteSavedLink(savedLink.id)}
                          >
                            ^ Delete Archive ^
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
                            <p className="savedLinkListLabel">Opened At: </p>
                            <p className="savedLinkList">
                              {savedLink.timeStamp}{' '}
                            </p>
                            <p className="savedLinkListLabel">Opened On: </p>
                            <p className="savedLinkList">
                              {savedLink.rootDash.name}{' '}
                            </p>
                          </li>
                          <button
                            className="savedLinkList"
                            onClick={() => deleteSavedLink(savedLink.id)}
                          >
                            ^ Delete Opened Link ^
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
        <Link to="/create-account" className="standardFooter">
          Sign Up
        </Link>
        <Link to="/" className="standardFooter">
          Home
        </Link>
        <Link to="/create-dash" className="standardFooter">
          Create Dash{' '}
        </Link>
      </footer>
    </>
  )
}
