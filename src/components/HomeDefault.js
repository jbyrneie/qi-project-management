import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import ProgrammingTasks from './ProgrammingTasks'
import FeasabilityTasks from './FeasabilityTasks'
import _ from 'lodash'
import {STATUS} from '../lib/utils'

// MUI
import Grid from '@material-ui/core/Grid';

// Custom Styles
import '../css/qi.css'

class HomeDefault extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const programmingTasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.PROGRAMMING])
    const feasbilityTasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.FEASABILITY])
    const fieldingTasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.FIELDING])

    return(
      <div>
        <FeasabilityTasks summary={true} tasks={feasbilityTasks}/>
        <ProgrammingTasks summary={true} tasks={programmingTasks}/>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(HomeDefault))
