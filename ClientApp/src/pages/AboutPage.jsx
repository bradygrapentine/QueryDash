import React from 'react'
import { Footer } from './DashPage'
import { Link } from 'react-router-dom'
import { getUserId, authHeader, isLoggedIn, logout } from '../auth'

export function AboutPage() {
  function handleLogout() {
    logout()
    window.location.assign('/')
  }

  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">About QueryDash</h1>
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
              <Link to="/historyandarchives" className="navLink">
                Browse Later
              </Link>
            </ul>
            <span className="navLink" onClick={handleLogout}>
              Log Out
            </span>
          </>
        ) : (
          <ul className="navBar">
            <Link to="/" className="navLink">
              Home
            </Link>
            <Link to="/create-account" className="navLink">
              Sign Up
            </Link>
            <Link to="/login" className="navLink">
              Log in
            </Link>
          </ul>
        )}
      </div>
      <main className="landingPageContainer">
        <div className="listOfDashes2">
          <p>Welcome to QueryDash</p>
          <p>
            {' '}
            This is a work in progress, so please don't abuse the search
            feature. You're welcome to try QueryDash and create an account,
            dashes, and panels, but the API requests really start to pile up
            when the search feature is used excessively. I'm planning a
            transition to an unmetered service sometime soon. Please reach out
            to me at brady.grapentine@gmail.com with QA comments, questions, or
            suggestions.
          </p>
          <p>
            To use QueryDash, navigate to a dash from the home page, type what
            you'd like to search for in the navigation bar, and click search
            (or, press Enter).{' '}
          </p>
          <p>
            Query dash will execute your search at every panel on your
            dashboard. Take the Shopping dashboard for example; if you search
            for shoes, it'll return results that relate to shoes from Target,
            Kohl's, Macy's, and every other store at that dash (and any more
            that you care to add). Or, if you have a question about a bug or
            concept you're confused about when you're, programming, just
            navigate to the programming dashboard and search; QueryDash will
            return results from several sites that host relevant documentation.
          </p>
          <p>
            {' '}
            But, it's a bit more complicated than that. When you click search,
            QueryDash takes you search query and executes refined searches on
            its back-end using the websites that are associated with the panels
            at that dashboard via parallel requests sent to a web search API, as
            opposed to simply executing each search on the front-end.
          </p>
          <p>
            So, your original search is executed remotely at every website that
            belongs to a panel on your dashboard and returned as if you sent one
            (approximately). You can keep coding or browsing other webpages
            while QueryDash does the work for you...at Ludicrous Speed.{' '}
          </p>
          <p>
            {' '}
            If you like QueryDash, you can make an account, create or copy an
            existing preset or user dashboard, create your own panels if the
            existing offerings don't meet your needs, and use your dash to
            search for whatever you'd like at whatever websites you desire.
            QueryDash saves users opened search results and lets them archive
            search results (which can be viewed at the dashboard's preferences
            page or your browse later page) so you can keep searching and come
            back to what you found later.
          </p>
        </div>
      </main>
      <footer className="standardFooter2"></footer>
    </>
  )
}
