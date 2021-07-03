import React from 'react'
import { Footer } from './DashPage'
import { Link } from 'react-router-dom'
import { getUserId, authHeader, isLoggedIn, logout } from '../auth'

// import './custom.scss'

// ------------------------------------------------------------- //

// export function aboutFooter(params) {
//   return (
//     <footer className="aboutPageFooter">
//       <Link to="/create-account" className="aboutPageFooter">
//         Sign Up
//       </Link>
//       <Link to="/" className="aboutPageFooter">
//         Home{' '}
//       </Link>
//       {/* <a href="https://www.google.com/" className="footer">
//         Contact
//       </a> */}
//     </footer>
//   )
// }

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
          <p>
            I built this application to address my desire to avoid the RAM and
            UI limitations on my own computer that often crop up when
            researching online.{' '}
          </p>
          <p>
            It's as simple as navigating to a dash, entering what you'd like to
            search for in the navigation bar, and clicking search (or, pressing
            Enter). Query dash executes your search at every panel on your
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
            But, its a bit more complicated than that. QueryDash executes the
            searches on its backend with the websites that are associated with
            the panels at that dashboard via a parallelized request sent to a
            web search API, as opposed to simply executing the searches on the
            frontend.
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
            QueryDash will save your opened and archived search results, which
            you can view at the dashboard's preferences page or your browse
            later page, so you can keep searching and come back to what you
            found later.
          </p>
          <p>
            {' '}
            This is a work in progress, so please forgive me for asking you not
            to spam the search feature. You're welcome to try QueryDash and
            create an account, dashes, and panels, but the API requests really
            start to pile up when the search feature is used excessively. I'm
            planning a transition to an unmetered service sometime soon. Please
            reach out to me at brady.grapentine@gmail.com with QA comments,
            questions, or suggestions.
          </p>
          {/*<a href="https://github.com/bradygrapentine/QueryDash">
            <p>https://github.com/bradygrapentine/QueryDash</p>
          </a>
          <p>
            My GitHub Page is also a work in progress as I just graduated, so
            here's a link to my repositories.
          </p>
          <a href="https://github.com/bradygrapentine?tab=repositories">
            <p>https://github.com/bradygrapentine?tab=repositories</p>
          </a>
          <a href="brady.grapentine@gmail.com">
            <p>Email: brady.grapentine@gmail.com</p>
          </a> */}
        </div>
      </main>
      <footer className="standardFooter2"></footer>
    </>
  )
}
