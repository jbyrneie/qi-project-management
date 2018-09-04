import React from 'react'
import { Route } from 'mobx-router'
import MyTasks from './components/MyTasks'
import NewSurvey from './components/NewSurvey'

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
  newSurvey: new Route({
    path: `${prefix}/newSurvey`,
    component: <NewSurvey/>
  }),
  catchall:new Route({
    path:`${prefix}/:def`,
    component: <MyTasks/>
  })
};

export default views;
