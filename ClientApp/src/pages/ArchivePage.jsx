import React from 'react'
// import './custom.scss'

// ------------------------------------------------------------- //

// might just dynamically alter element size
// to push other panels down on dash page instead of creating pag for this

export function ArchivePage() {
  const Archives = [
    {
      id: 2,
      isArchive: true,
      userId: 1,
      dashId: 1,
      queryUrl: 'https://en.wikipedia.org/wiki/Cat',
      timeStamp: '2020-01-02T02:01:00',
    },
    {
      id: 3,
      isArchive: true,
      userId: 1,
      dashId: 1,
      queryUrl: 'https://en.wikipedia.org/wiki/Hamster',
      timeStamp: '2020-01-02T03:01:00',
    },
    {
      id: 4,
      isArchive: true,
      userId: 1,
      dashId: 1,
      queryUrl: 'https://en.wikipedia.org/wiki/Owl',
      timeStamp: '2020-01-02T04:01:00',
    },
    {
      id: 15,
      isArchive: true,
      userId: 1,
      dashId: 3,
      queryUrl: 'https://en.wikipedia.org/wiki/Hamster',
      timeStamp: '2020-01-04T03:01:00',
    },
    {
      id: 16,
      isArchive: true,
      userId: 1,
      dashId: 3,
      queryUrl: 'https://en.wikipedia.org/wiki/Owl',
      timeStamp: '2020-01-04T04:01:00',
    },
    {
      id: 18,
      isArchive: true,
      userId: 1,
      dashId: 3,
      queryUrl: 'https://en.wikipedia.org/wiki/Camel',
      timeStamp: '2020-01-04T06:01:00',
    },
  ]

  return <h1 className="header">QueryDash</h1>
}
