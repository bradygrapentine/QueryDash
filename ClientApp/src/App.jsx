import React from 'react'
import './custom.scss'

import { DashPage } from './pages/DashPage.jsx'
import { Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { CreateAccountPage } from './pages/CreateAccountPage.jsx'
import { CreateDashPage } from './pages/CreateDashPage.jsx'
import { DashPreferences } from './pages/DashPreferences.jsx'
import { HistoryAndArchivesPage } from './pages/HistoryAndArchivesPage.jsx'

export function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        {/* ---------------------------------------------- */}
        <Route exact path="/create-account">
          <CreateAccountPage />
        </Route>
        <Route exact path="/create-dash">
          <CreateDashPage />
        </Route>
        {/* ---------------------------------------------- */}
        <Route exact path="/historyandarchives">
          <HistoryAndArchivesPage />
        </Route>
        {/* ---------------------------------------------- */}
        <Route exact path="/dash/:id">
          <DashPage />
        </Route>
        <Route exact path="/preferences/:id">
          <DashPreferences />
        </Route>
        {/* ---------------------------------------------- */}
        <Route path="*">Not Found...</Route>
      </Switch>
    </>
  )
}

// ------------------------------------------------------------- //
