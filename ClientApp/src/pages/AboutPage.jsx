import React from 'react'
import { Footer } from './DashPage'
import { Link } from 'react-router-dom'
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
  return (
    <>
      <header className="altHeader">
        <Link className="linkForHeader" to="/">
          <h1 className="altHeader">QueryDash</h1>
        </Link>{' '}
      </header>
      <main className="landingPageContainer">
        <div className="listOfDashes2">
          <h3 className="HeaderDashList2">About</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            excepturi porro accusantium exercitationem unde natus rerum
            voluptatibus sint saepe aut, molestiae eum consequatur ullam neque
            quibusdam ex nulla. Accusamus, asperiores! Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Voluptate cupiditate ipsa
            recusandae, nemo porro natus ipsum sit expedita eum necessitatibus
            accusantium laborum voluptatem doloremque voluptates in ex mollitia
            aperiam numquam?
          </p>
        </div>
      </main>
      <footer className="standardFooter2">
        <Link to="/create-account" className="navLink">
          Sign Up
        </Link>
        <Link to="/login" className="navLink">
          Log In
        </Link>
        <Link to="/" className="navLink">
          Home
        </Link>
      </footer>
    </>
  )
}
