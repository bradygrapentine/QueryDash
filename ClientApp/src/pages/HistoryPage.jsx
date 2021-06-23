import React from 'react'
import { Footer } from './DashPage'
import { Link } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

export function HistoryPage() {
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

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">QueryDash</h1>
      </Link>{' '}
      <main className="aboutPage">
        <article className="aboutPageArticle">
          <h5 className="header">Article 1</h5>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            excepturi porro accusantium exercitationem unde natus rerum
            voluptatibus sint saepe aut, molestiae eum consequatur ullam neque
            quibusdam ex nulla. Accusamus, asperiores!
          </p>
        </article>
        <article className="aboutPageArticle">
          <h5 className="header">Article 1</h5>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            cupiditate ipsa recusandae, nemo porro natus ipsum sit expedita eum
            necessitatibus accusantium laborum voluptatem doloremque voluptates
            in ex mollitia aperiam numquam?
          </p>
        </article>
      </main>
      <footer className="standardFooter">
        <Link to="/create-account" className="standardFooter">
          Sign Up
        </Link>
        <Link to="/" className="standardFooter">
          Home
        </Link>
        <Link to="/account" className="standardFooter">
          Account
        </Link>
        <Link to="/create-dash" className="standardFooter">
          Create Dash{' '}
        </Link>
      </footer>
    </>
  )
}
