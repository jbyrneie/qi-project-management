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

  _getTasksByPerson(tasks, person) {
    let personTasks = []
    tasks.filter(function(t) {
      const asignee = t.asignees.filter(function(a) {
        //console.log('a: ', JSON.stringify(a));
        const same = (a.first_name === person.first_name && a.last_name === person.last_name)
        //console.log('same: ',same);
        return same===true?a:null
      })
      //console.log('asignee: ', JSON.stringify(asignee));
      if (asignee.length > 0)
        personTasks.push(t)
    });

    //console.log('data: ', JSON.stringify(data));
    return personTasks
  }

  _getPeople(tasks) {
    var asignees = [];
    for (var i = 0; i < tasks.length; ++i) {
      for (var j = 0; j < tasks[i].asignees.length; ++j)
        asignees.push(tasks[i].asignees[j]);
    }

    let uniques = []
    _.forEach(asignees, function(person) {
      if (_.find(uniques, person) == null) {
        uniques.push(person);
      }
    })

    return uniques
  }

  render() {
    console.log('HomeByPerson');
    const tasks = this.props.store.qiStore.myTasks
    const people = this._getPeople(tasks)

    return people.map(p => {
      const personTasks = this._getTasksByPerson(tasks, p)
      return (
        <TasksByPerson person={p.first_name + ' ' + p.last_name} tasks={personTasks}/>
      )
    })
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(HomeByPerson))
