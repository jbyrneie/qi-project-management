import React from 'react'
import ReactDOM from 'react-dom'
import {MobxRouter, startRouter} from 'mobx-router'
import { Provider } from 'mobx-react'
import views from './views'
import { createStores } from './stores/index'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './css/index.css'

const stores = createStores()

stores.qiStore.getMyTasks()
.then(() => {

  let pathname = window.location.pathname.replace(/\/profile/g,'')
  const initialRoute = `${process.env.REACT_APP_QI_MOUNT}${pathname}${window.location.search}`

  startRouter(views, stores, initialRoute, {
    strict: false,
    notfound: () => {
      window.location = `${process.env.REACT_APP_QI_MOUNT}/${window.location.search}`
    }
  })
  ReactDOM.render(
    <Provider store={stores}>
      <MuiThemeProvider>
        <div>
          <section>
            <MobxRouter/>
          </section>
        </div>
      </MuiThemeProvider>
    </Provider>
    ,document.getElementById('root')
  )
})
