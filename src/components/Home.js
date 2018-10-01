import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import MyTasks from './MyTasks'
import ProgrammingTasks from './ProgrammingTasks'
import FeasabilityTasks from './FeasabilityTasks'
import HomeDefault from './HomeDefault'
import HomeByPerson from './HomeByPerson'
import _ from 'lodash'
import {STATUS} from '../lib/utils'

// MUI
import Grid from '@material-ui/core/Grid';

// Custom Styles
import '../css/qi.css'

class Home extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    return(
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar myTasks={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='Surveys' newSurvey={true}/>
                <div className='center-content'>
                  <MyTasks />
                  <HomeDefault/>
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Home))
