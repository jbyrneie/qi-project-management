import React from 'react'
import { Route } from 'mobx-router'
import SurveyLead from './components/SurveyLead'
import SurveyDetails from './components/SurveyDetails'
import Quote from './components/Quote'
import Settings from './components/Settings'
import Feasability from './components/Feasability'
import Programming from './components/Programming'
import Reporting from './components/Reporting'
import Fielding from './components/Fielding'
import Vendors from './components/Vendors'
import VendorSurveys from './components/VendorSurveys'
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
  surveyDetails: new Route({
    path: `${prefix}/surveyDetails`,
    component: <SurveyDetails/>
  }),
  surveyLead: new Route({
    path: `${prefix}/surveyLead`,
    component: <SurveyLead/>
  }),
  vendors: new Route({
    path: `${prefix}/vendors`,
    component: <Vendors/>
  }),
  vendorSurveys: new Route({
    path: `${prefix}/vendorSurveys`,
    component: <VendorSurveys/>
  }),
  catchall:new Route({
    path:`${prefix}/:def`,
    component: <Home/>
  })
};

export default views;
