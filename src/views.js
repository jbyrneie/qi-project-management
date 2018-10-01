import React from 'react'
import { Route } from 'mobx-router'
import SurveyLead from './components/SurveyLead'
import Invites from './components/Invites'
import Quote from './components/Quote'
import Settings from './components/Settings'
import Feasability from './components/Feasability'
import Programming from './components/Programming'
import Reporting from './components/Reporting'
import Fielding from './components/Fielding'
import Home from './components/Home'

let prefix=''
if (process.env.NODE_ENV === 'production')
  prefix = process.env.REACT_APP_QI_MOUNT

const gotoRouteIfLoggedIn = (store, views, runIfLoggedIn) => {
  runIfLoggedIn();
}

const views = {
  home: new Route({
    path: `${prefix}/`,
    component: <Home/>
  }),
  feasability: new Route({
    path: `${prefix}/feasability`,
    component: <Feasability/>
  }),
  fielding: new Route({
    path: `${prefix}/fielding`,
    component: <Fielding/>
  }),
  invites: new Route({
    path: `${prefix}/invites`,
    component: <Invites/>
  }),
  programming: new Route({
    path: `${prefix}/programming`,
    component: <Programming/>
  }),
  quote: new Route({
    path: `${prefix}/quote`,
    component: <Quote/>
  }),
  reporting: new Route({
    path: `${prefix}/reporting`,
    component: <Reporting/>
  }),
  settings: new Route({
    path: `${prefix}/settings`,
    component: <Settings/>
  }),
  surveyLead: new Route({
    path: `${prefix}/surveyLead`,
    component: <SurveyLead/>
  }),
  catchall:new Route({
    path:`${prefix}/:def`,
    component: <Home/>
  })
};

export default views;
