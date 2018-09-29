import React from 'react'
import { Route } from 'mobx-router'
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
  catchall:new Route({
    path:`${prefix}/:def`,
    component: <Home/>
  })
};

export default views;
