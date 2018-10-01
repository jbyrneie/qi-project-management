import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import TasksByPerson from './TasksByPerson'
import _ from 'lodash'
import {STATUS} from '../lib/utils'

// MUI
import Grid from '@material-ui/core/Grid';

// Custom Styles
import '../css/qi.css'

class HomeByPerson extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const tasks = this.props.store.qiStore.myTasks

    return(
      /*
      tasks.map((task, index) => (
        <div>xx</div>
      ))
      */
      tasks.map((task, index) => (
        <TasksByPerson person='Jack Byrne' tasks={tasks} />
      ))
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(HomeByPerson))
