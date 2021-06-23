import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

// ------------------------------------------------------------- //

export function QLink() {
  return (
    <div className="link">
      <button></button>
      <a href="https://en.wikipedia.org/wiki/Jack_Black">
        {' '}
        <p> Jack Black - Wikipedia</p>
      </a>
      <button className="viewDescription">description</button>
      <button className="viewLink">view</button>
      <button className="viewLink">image</button>
    </div>
  )
}

// ------------------------------------------------------------- //

export function Panel() {
  return (
    <div className="panelContainer">
      <button className="header">Endpoint Head</button>
      <div rows="7" cols="1" wrap="off" className="panel">
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
        <QLink />
      </div>{' '}
    </div>
  )
}

// ------------------------------------------------------------- //

export function DashPage() {
  const [menuOpen, setMenuOpen] = useState(true)

  const [dash, setDash] = useState({
    creationDate: '',
    name: '',
    // panels: null,
    // panelAssignments: null,
    // savedLinks: null,
    linksPerPanel: 0,
  })

  const params = useParams()

  const id = params.id

  async function getDash() {
    const response = await fetch(`/api/Dashes/${id}`)

    if (response.ok) {
      const apiData = await response.json()
      setDash(apiData)
    }
  }

  function DashQuery(params) {
    return (
      <div className="containerDashQuery">
        {menuOpen ? (
          <>
            <div className="dashQuery">
              <form className="dashQuery">
                <input
                  className="dashQuery"
                  type="text"
                  placeholder="Query Here"
                />
              </form>
              <div className="buttonContainer1">
                <button>Open</button>
                <button>Archive</button>
              </div>
              <div className="buttonContainer2">
                <Link to="/history">
                  <button>History</button>
                </Link>
                <Link to="/preferences">
                  <button>Dash Settings</button>
                </Link>
                <Link to="/">
                  <button>Home</button>
                </Link>
              </div>{' '}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="collapseMenu"
            >
              X
            </button>
          </>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="collapsedMenu"
          >
            Open Menu
          </button>
        )}
      </div>
    )
  }

  const SearchAPIResponse = {
    _type: 'SearchResponse', // ErrorResponse if problem with API
    queryContext: {
      originalQuery: 'sialing dingy for sale',
      alteredQuery: 'sailing dinghy for sale',
      alterationOverrideQuery: '+sialing +dingy for sale',
    },
    webPages: {
      webSearchUrl: 'https://www.bing.com/search?q=mt+rainier',
      totalEstimatedMatches: 594000,
      value: [
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
        {
          id: 'https://api.bing.microsoft.com/api/v7/#WebPages.0',
          name: 'Dinghy sailing',
          url: 'https://www.bing.com/cr?IG=3A43CA5...',
          displayUrl: 'https://en.contoso.com/wiki/Dinghy_sailing',
          snippet: 'Dinghy sailing is the activity of sailing small boats...',
          dateLastCrawled: '2017-04-05T16:25:00',
        },
      ],
    },
    images: {
      id: 'https://api.bing.microsoft.com/api/v7/#Images',
      readLink:
        'https://api.bing.microsoft.com/api/v7/images/search?q=dinghy+sailing&qpvt=dinghy+sailing',
      webSearchUrl:
        'https://www.bing.com/images/search?q=dinghy+sailing&qpvt=lady+gaga',
      isFamilyFriendly: true,
      value: [
        {
          name: 'Rich Passage Sailing Dinghy',
          webSearchUrl: 'https://www.bing.com/cr?IG=3A43CA5CA64...',
          thumbnailUrl: 'https://tse1.mm.bing.net/th?id=OIP....',
          datePublished: '2011-10-29T11:26:00',
          contentUrl: 'http://upload.contoso.com/sailing/...',
          hostPageUrl: 'http://www.bing.com/cr?IG=3A43CA5CA6464....',
          contentSize: '79239 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'http://en.contoso.com/wiki/File...',
          width: 526,
          height: 688,
          thumbnail: {
            width: 229,
            height: 300,
          },
          insightsSourcesSummary: {
            shoppingSourcesCount: 0,
            recipeSourcesCount: 0,
          },
        },
        {
          name: 'Rich Passage Sailing Dinghy',
          webSearchUrl: 'https://www.bing.com/cr?IG=3A43CA5CA64...',
          thumbnailUrl: 'https://tse1.mm.bing.net/th?id=OIP....',
          datePublished: '2011-10-29T11:26:00',
          contentUrl: 'http://upload.contoso.com/sailing/...',
          hostPageUrl: 'http://www.bing.com/cr?IG=3A43CA5CA6464....',
          contentSize: '79239 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'http://en.contoso.com/wiki/File...',
          width: 526,
          height: 688,
          thumbnail: {
            width: 229,
            height: 300,
          },
          insightsSourcesSummary: {
            shoppingSourcesCount: 0,
            recipeSourcesCount: 0,
          },
        },
        {
          name: 'Rich Passage Sailing Dinghy',
          webSearchUrl: 'https://www.bing.com/cr?IG=3A43CA5CA64...',
          thumbnailUrl: 'https://tse1.mm.bing.net/th?id=OIP....',
          datePublished: '2011-10-29T11:26:00',
          contentUrl: 'http://upload.contoso.com/sailing/...',
          hostPageUrl: 'http://www.bing.com/cr?IG=3A43CA5CA6464....',
          contentSize: '79239 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'http://en.contoso.com/wiki/File...',
          width: 526,
          height: 688,
          thumbnail: {
            width: 229,
            height: 300,
          },
          insightsSourcesSummary: {
            shoppingSourcesCount: 0,
            recipeSourcesCount: 0,
          },
        },
        {
          name: 'Rich Passage Sailing Dinghy',
          webSearchUrl: 'https://www.bing.com/cr?IG=3A43CA5CA64...',
          thumbnailUrl: 'https://tse1.mm.bing.net/th?id=OIP....',
          datePublished: '2011-10-29T11:26:00',
          contentUrl: 'http://upload.contoso.com/sailing/...',
          hostPageUrl: 'http://www.bing.com/cr?IG=3A43CA5CA6464....',
          contentSize: '79239 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'http://en.contoso.com/wiki/File...',
          width: 526,
          height: 688,
          thumbnail: {
            width: 229,
            height: 300,
          },
          insightsSourcesSummary: {
            shoppingSourcesCount: 0,
            recipeSourcesCount: 0,
          },
        },
        {
          name: 'Rich Passage Sailing Dinghy',
          webSearchUrl: 'https://www.bing.com/cr?IG=3A43CA5CA64...',
          thumbnailUrl: 'https://tse1.mm.bing.net/th?id=OIP....',
          datePublished: '2011-10-29T11:26:00',
          contentUrl: 'http://upload.contoso.com/sailing/...',
          hostPageUrl: 'http://www.bing.com/cr?IG=3A43CA5CA6464....',
          contentSize: '79239 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'http://en.contoso.com/wiki/File...',
          width: 526,
          height: 688,
          thumbnail: {
            width: 229,
            height: 300,
          },
          insightsSourcesSummary: {
            shoppingSourcesCount: 0,
            recipeSourcesCount: 0,
          },
        },
      ],
    },
    relatedSearches: {},
    news: {},
    entities: {},
    places: {},
    translations: {},
  }

  useEffect(() => {
    getDash()
  }, [id])

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">{dash.name}</h1>
      </Link>{' '}
      <main className="main">
        <DashQuery />
        <div className="displayContainer">
          <div className="display">
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
          </div>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/create-account" className="navLink">
          Sign Up
        </Link>
        <Link to="/about" className="navLink">
          About
        </Link>
        <Link to="/account" className="navLink">
          Account
        </Link>
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/create-dash" className="navLink">
          Create Dash{' '}
        </Link>
      </footer>{' '}
    </>
  )
}
