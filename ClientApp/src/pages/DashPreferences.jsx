import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
// import './custom.scss'

// ------------------------------------------------------------- //

export function DashPreferences() {
  const [dash, setDash] = useState({
    creationDate: '',
    dashName: '',
    isPreset: null,
    presetPublicationDate: '',
    linksPerPanel: 0,
  })

  let newDashName = ''
  let newIsPreset = null
  let linksPerPanel = 0

  const history = useHistory()

  const params = useParams()

  const [errorMessage, setErrorMessage] = useState()

  const id = params.id

  // function handleStringFieldChange(event) {
  //   const value = event.target.value
  //   const fieldName = event.target.name

  //   updatedDash = { ...dash, [fieldName]: value }

  //   setDash(updatedDash)
  // }

  // async function handleFormSubmission(event) {
  //   event.preventDefault()

  //   const response = await fetch('/api/Dashes', {
  //     method: 'PUT',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(updatedDash),
  //   })
  //   const apiResponse = await response.json()
  //   console.log(apiResponse)

  //   if (apiResponse.status === 400) {
  //     setErrorMessage(Object.values(apiResponse.errors).join(' '))
  //   } else {
  // window.location.assign.push('/')
  //   }
  // }

  useEffect(() => {
    async function getDash() {
      const response = await fetch(`/api/Dashes/${id}`)

      if (response.ok) {
        const apiData = await response.json()
        setDash(apiData)
      }
    }
    getDash()
  }, [id])

  return (
    <>
      <Link className="linkForHeader" to="/">
        <h1 className="header">{dash.dashName}</h1>
      </Link>
      <main className="mainCreateAccount">
        <div className="containerForHeaderAndForm">
          <h5 className="header">Form Header</h5>
          <div className="formContainerCreateAccount">
            <form className="formCreateAccount">
              {errorMessage ? <p>{errorMessage}</p> : null}
              <div className="inputContainer">
                <label htmlFor="dashName">DashName: </label>
                <input
                  name="dashName"
                  type="text"
                  // value={}
                  // onChange={}
                />
              </div>
              <div className="inputContainer">
                <label htmlFor="linksPerPanel">Links/Panel: </label>
                <input
                  name="linksPerPanel"
                  type="text"
                  // value={}
                  // onChange={}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </main>
      <footer className="standardFooter">
        <Link to="/" className="navLink">
          Home
        </Link>
        <Link to="/dash/:id" className="navLink">
          Back to Dash{' '}
        </Link>
      </footer>
    </>
  )
}
