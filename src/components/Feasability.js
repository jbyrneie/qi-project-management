import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import MyTasks from './MyTasks'
import FeasabilityTasks from './FeasabilityTasks'
import views from '../views'
import _ from 'lodash'
import {STATUS} from '../lib/utils'

// MUI
import Grid from '@material-ui/core/Grid';

// Custom Styles
import '../css/qi.css'

class Feasability extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const tasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.FEASABILITY])
    return(
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar feasability={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='Feasability' newSurvey={true}/>
                <div className='center-content'>
                  <MyTasks />
                  <FeasabilityTasks tasks={tasks}/>
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Feasability))
