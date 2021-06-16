import React from 'react'
import './custom.scss'

import { DashPage } from './pages/DashPage.jsx'
import { Link, Route, Switch } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { CreateAccountPage } from './pages/CreateAccountPage.jsx'
import { AccountPage } from './pages/AccountPage.jsx'
import { CreateDashPage } from './pages/CreateDashPage.jsx'
import { PanelFullScreen } from './pages/PanelFullScreen.jsx'
import { DashPreferences } from './pages/DashPreferences.jsx'

// // {
// // /* <header>
// //       {' '}
// //       <h2>QueryDash</h2>
// //     </header> */
// // }

export function App() {
  return (
    <>
      <Switch>
        {/* <Route exact path="/:dashID"> */}
        <Route exact path="/">
          <DashPage />
        </Route>
        {/* <Route exact path="/">
          <LandingPage />
        </Route> */}
        <Route exact path="/about">
          <AboutPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/create-account">
          <CreateAccountPage />
        </Route>
        <Route exact path="/:accountId">
          <AccountPage />
        </Route>
        <Route exact path="/create-dash">
          <CreateDashPage />
        </Route>{' '}
        <Route exact path="/preferences/:dashID">
          <DashPreferences />
        </Route>
        <Route exact path="/:panelId">
          <PanelFullScreen />
        </Route>
        <Route path="*">Not Found...</Route>
      </Switch>
    </>
  )
}

// ------------------------------------------------------------- //
