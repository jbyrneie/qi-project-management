import React from 'react'
import { Route } from 'mobx-router'
import MyTasks from './components/MyTasks'
import SurveyLead from './components/SurveyLead'

let prefix=''
if (process.env.NODE_ENV === 'production')
  prefix = process.env.REACT_APP_QI_MOUNT

const gotoRouteIfLoggedIn = (store, views, runIfLoggedIn) => {
  runIfLoggedIn();
}

const views = {
  home: new Route({
    path: `${prefix}/`,
    component: <MyTasks/>
  }),
  surveyLead: new Route({
    path: `${prefix}/surveyLead`,
    component: <SurveyLead/>
  }),
  catchall:new Route({
    path:`${prefix}/:def`,
    component: <MyTasks/>
  })
};

export default views;
